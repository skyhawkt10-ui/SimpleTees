(() => {
  "use strict";

  const ORDER_EMAIL = "orders@examplewebsite142.com";
  const UNIT_PRICE = 499;
  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 99;

  const quantityInput = document.getElementById("quantity");
  const sizeButtons = [...document.querySelectorAll(".size-option")];
  const addButton = document.getElementById("add-to-cart-button");
  const orderButton = document.getElementById("order-now-button");
  if (!quantityInput || !addButton || !orderButton) return;

  let selectedSize = "";
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.size || "";
      sizeButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    });
  });

  function quantityValue() {
    const value = Number.parseInt(quantityInput.value, 10);
    if (!Number.isInteger(value) || value < MIN_QUANTITY || value > MAX_QUANTITY) {
      window.alert("Please enter a quantity between 1 and 99.");
      quantityInput.focus();
      return null;
    }
    return value;
  }

  document.getElementById("quantity-decrease").addEventListener("click", () => {
    const current = Number.parseInt(quantityInput.value, 10) || 1;
    quantityInput.value = String(Math.max(MIN_QUANTITY, current - 1));
  });
  document.getElementById("quantity-increase").addEventListener("click", () => {
    const current = Number.parseInt(quantityInput.value, 10) || 1;
    quantityInput.value = String(Math.min(MAX_QUANTITY, current + 1));
  });
  quantityInput.addEventListener("change", () => {
    const value = Number.parseInt(quantityInput.value, 10);
    if (!Number.isInteger(value)) quantityInput.value = "1";
    else quantityInput.value = String(Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value)));
  });

  const overlay = document.createElement("div");
  overlay.className = "order-form-overlay";
  overlay.id = "order-form-overlay";
  overlay.innerHTML = `
    <section class="order-form-dialog" role="dialog" aria-modal="true" aria-labelledby="order-form-title">
      <button type="button" class="order-form-close" aria-label="Close order form">×</button>
      <p class="order-form-eyebrow">SIMPLE TEES</p>
      <h2 id="order-form-title">Complete your order</h2>
      <p class="order-form-intro">Enter your contact and delivery details. Your email app will open with your order ready to review.</p>
      <div class="order-form-summary">
        <p><strong>Product:</strong> <span id="summary-product"></span></p>
        <p><strong>Size:</strong> <span id="summary-size"></span></p>
        <p><strong>Quantity:</strong> <span id="summary-quantity"></span></p>
        <p><strong>Total:</strong> <span id="summary-total"></span></p>
      </div>
      <form id="customer-order-form">
        <div class="order-form-fields">
          <div class="order-field"><label for="customer-name">Full name *</label><input id="customer-name" name="customerName" autocomplete="name" required maxlength="100"></div>
          <div class="order-field"><label for="customer-email">Email address *</label><input id="customer-email" name="customerEmail" type="email" autocomplete="email" required maxlength="150"></div>
          <div class="order-field"><label for="customer-phone">Contact number *</label><input id="customer-phone" name="customerPhone" type="tel" autocomplete="tel" required maxlength="30"></div>
          <div class="order-field order-field-full"><label for="customer-address">Complete delivery address *</label><textarea id="customer-address" name="customerAddress" autocomplete="street-address" rows="3" required maxlength="500"></textarea></div>
          <div class="order-field order-field-full"><label for="customer-notes">Additional notes (optional)</label><textarea id="customer-notes" name="customerNotes" rows="2" maxlength="500" placeholder="Delivery instructions or other notes"></textarea></div>
        </div>
        <p class="order-form-required">* Required fields</p>
        <button type="submit" class="order-form-submit">CONTINUE TO EMAIL</button>
        <p class="order-form-disclaimer">Your email application must be configured to handle email links. Review the prepared message and press Send to place your order.</p>
      </form>
    </section>`;
  document.body.appendChild(overlay);

  const form = overlay.querySelector("#customer-order-form");
  const closeButton = overlay.querySelector(".order-form-close");
  const productName = document.body.dataset.productName || "Simple Tees product";

  function closeDialog() {
    overlay.classList.remove("is-open");
    orderButton.focus();
  }
  function openOrder() {
    if (!selectedSize) {
      window.alert("Please select a shirt size before ordering.");
      sizeButtons[0]?.focus();
      return;
    }
    const quantity = quantityValue();
    if (quantity === null) return;
    document.getElementById("summary-product").textContent = productName;
    document.getElementById("summary-size").textContent = selectedSize;
    document.getElementById("summary-quantity").textContent = String(quantity);
    document.getElementById("summary-total").textContent = "₱ " + (UNIT_PRICE * quantity).toFixed(2);
    overlay.classList.add("is-open");
    overlay.querySelector("#customer-name").focus();
  }

  addButton.addEventListener("click", openOrder);
  orderButton.addEventListener("click", openOrder);
  closeButton.addEventListener("click", closeDialog);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeDialog();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) closeDialog();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const quantity = quantityValue();
    if (quantity === null) return;

    const get = (id) => document.getElementById(id).value.trim();
    const subject = `Simple Tees Order - ${productName}`;
    const body = [
      "Hello Simple Tees,",
      "",
      "I would like to place the following order:",
      "",
      "ORDER DETAILS",
      `Product: ${productName}`,
      `Size: ${selectedSize}`,
      `Quantity: ${quantity}`,
      `Unit price: PHP ${UNIT_PRICE.toFixed(2)}`,
      `Total: PHP ${(UNIT_PRICE * quantity).toFixed(2)}`,
      "",
      "CUSTOMER DETAILS",
      `Full name: ${get("customer-name")}`,
      `Email: ${get("customer-email")}`,
      `Contact number: ${get("customer-phone")}`,
      `Delivery address: ${get("customer-address")}`,
      `Additional notes: ${get("customer-notes") || "None"}`,
      "",
      "Please contact me to confirm availability, delivery, and payment."
    ].join("\r\n");

    const mailto = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // This navigation is intentionally performed directly inside the submit gesture.
    window.location.href = mailto;
  });
})();