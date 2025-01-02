export const formatAmount = (amount) => {
  return amount ? parseFloat(Number(amount).toFixed(2)) : 0;
};
