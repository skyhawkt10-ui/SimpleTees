(() => {
  "use strict";
  const RECIPIENT_EMAIL = "orders@examplewebsite142.com";
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const value = (id) => document.getElementById(id).value.trim();
    const firstName = value("first-name");
    const surname = value("surname");
    const senderEmail = value("email");
    const message = value("message");

    const subject = `Simple Tees website message from ${firstName} ${surname}`;
    const body = [
      `First name: ${firstName}`,
      `Surname: ${surname}`,
      `Email address: ${senderEmail}`,
      "",
      "Message:",
      message
    ].join("\r\n");

    const mailto = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Keep the mailto navigation in the form-submit gesture so browsers can hand it to the mail app.
    window.location.href = mailto;
  });
})();