const priceTab = document.getElementById("priceTab");
const weightTab = document.getElementById("weightTab");
const pricePerKg = document.getElementById("pricePerKg");
const secondValue = document.getElementById("secondValue");
const pricePerKgLabel = document.getElementById("pricePerKgLabel");
const secondValueLabel = document.getElementById("secondValueLabel");
const secondIcon = document.getElementById("secondIcon");
const result = document.getElementById("result");
const resultLabel = document.getElementById("resultLabel");
const resultValue = document.getElementById("resultValue");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");

let mode = "price";
let previousMode = "price";

function formatNumber(value, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

function calculate() {
  const price = Number(pricePerKg.value);
  const amount = Number(secondValue.value);

  if (price <= 0 || amount < 0) {
    result.hidden = true;
    return;
  }

  if (mode === "price") {
    if (amount <= 0) {
      result.hidden = true;
      return;
    }
    const grams = (amount / price) * 1000;
    resultLabel.textContent = "Weight:";
    resultValue.textContent = `${formatNumber(grams, 2)} g`;
  } else {
    if (amount <= 0) {
      result.hidden = true;
      return;
    }
    const cost = (amount / 1000) * price;
    resultLabel.textContent = "Cost:";
    resultValue.textContent = `৳ ${formatNumber(cost, 2)}`;
  }

  result.hidden = false;
}

function applyMode(nextMode) {
  mode = nextMode;
  const isPrice = mode === "price";

  priceTab.classList.toggle("active", isPrice);
  weightTab.classList.toggle("active", !isPrice);
  priceTab.setAttribute("aria-selected", String(isPrice));
  weightTab.setAttribute("aria-selected", String(!isPrice));
  secondValueLabel.textContent = isPrice
    ? "Amount you want to spend (৳)"
    : "Quantity in Grams";
  secondIcon.textContent = isPrice ? "৳" : "g";
  secondIcon.style.color = isPrice ? "#1ee4a1" : "#60a5fa";
  secondValue.value = "0";
  result.hidden = true;
}

function setMode(nextMode) {
  previousMode = mode;
  applyMode(nextMode);

  modalText.textContent =
    mode === "price"
      ? "In this tab, enter the price per kg and the amount you want to spend to calculate the quantity in grams."
      : "In this tab, enter the price per kg and the quantity in grams to calculate the cost in BDT.";
  modal.hidden = false;
}

priceTab.addEventListener("click", () => setMode("price"));
weightTab.addEventListener("click", () => setMode("weight"));
pricePerKg.addEventListener("input", calculate);
secondValue.addEventListener("input", calculate);

document.getElementById("gotIt").addEventListener("click", () => {
  modal.hidden = true;
});
document.getElementById("cancelModal").addEventListener("click", () => {
  modal.hidden = true;
  applyMode(previousMode);
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.hidden = true;
});

calculate();
