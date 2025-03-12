export const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(), // Ensures currency code is in uppercase
    minimumFractionDigits: 0,
  }).format(amount);
};
