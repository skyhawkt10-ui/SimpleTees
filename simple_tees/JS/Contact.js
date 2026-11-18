// Navigation handlers
const hOMEText = document.getElementById("hOMEText");
if (hOMEText) {
  hOMEText.addEventListener("click", function (e) {
    // Add your code here
  });
}

const sHOPText = document.getElementById("sHOPText");
if (sHOPText) {
  sHOPText.addEventListener("click", function (e) {
    // Add your code here
  });
}

const home = document.getElementById("home");
if (home) {
  home.addEventListener("click", function (e) {
    // Add your code here
  });
}

// Contact form mailto handler
const TO_ADDRESS = "skyhawkt10@gmail.com";
const form = document.querySelector("#contact-form");

function buildMailto() {
  const firstName = document.querySelector("#first-name").value.trim();
  const surname = document.querySelector("#surname").value.trim();
  const email = document.querySelector("#email").value.trim();
  const text = document.querySelector("#message").value.trim();

  const subject = "Website message from " + firstName + " " + surname;
  const body =
    "First Name: " + firstName + "\r\n" +
    "Surname: " + surname + "\r\n" +
    "Email address: " + email + "\r\n\r\n" +
    text;

  return (
    "mailto:" + TO_ADDRESS +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body)
  );
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = buildMailto();
  });
}