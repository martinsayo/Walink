const countryCodeEl = document.getElementById("countryCode");
const manualCodeField = document.getElementById("manualCodeField");
const manualCodeEl = document.getElementById("manualCode");
const phoneNumberEl = document.getElementById("phoneNumber");
const messageEl = document.getElementById("message");
const generateBtn = document.getElementById("generateBtn");
const errorMsg = document.getElementById("errorMsg");

const resultSection = document.getElementById("resultSection");
const linkOutput = document.getElementById("linkOutput");
const copyBtn = document.getElementById("copyBtn");
const openBtn = document.getElementById("openBtn");

countryCodeEl.addEventListener("change", () => {
  manualCodeField.hidden = countryCodeEl.value !== "other";
});

function showError(text) {
  errorMsg.textContent = text;
  errorMsg.hidden = false;
  resultSection.hidden = true;
}

function clearError() {
  errorMsg.hidden = true;
}

function generateLink() {
  clearError();

  const code = countryCodeEl.value === "other"
    ? manualCodeEl.value.replace(/\D/g, "")
    : countryCodeEl.value;

  const number = phoneNumberEl.value.replace(/\D/g, "");

  if (!code) {
    showError("Pick or enter a country code.");
    return;
  }
  if (!number) {
    showError("Enter a phone number.");
    return;
  }
  if (number.startsWith("0")) {
    showError("Drop the leading 0 — just the number after it.");
    return;
  }

  const fullNumber = code + number;
  const message = messageEl.value.trim();
  const encodedMessage = encodeURIComponent(message);

  const link = message
    ? `https://wa.me/${fullNumber}?text=${encodedMessage}`
    : `https://wa.me/${fullNumber}`;

  linkOutput.textContent = link;
  openBtn.href = link;
  resultSection.hidden = false;
  copyBtn.textContent = "Copy";
  copyBtn.classList.remove("copied");
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(linkOutput.textContent).then(() => {
    copyBtn.textContent = "Copied ✓";
    copyBtn.classList.add("copied");
  });
});

generateBtn.addEventListener("click", generateLink);
