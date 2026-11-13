// src/utils/formatCurrency.js
export function formatCurrency(amount, currency = "ETB") {
  return `${amount.toLocaleString("en-ET")} ${currency}`;
}
