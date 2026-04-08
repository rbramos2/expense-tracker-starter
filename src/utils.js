export function formatCurrency(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
