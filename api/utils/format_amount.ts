export const formatAmount = (amount: string | number | null): number => {
  return amount ? parseFloat(Number(amount).toFixed(2)) : 0;
};
 