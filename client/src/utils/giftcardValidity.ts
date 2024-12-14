export function isGiftCardValid(giftCard: {
  balance: number;
  expirationDate: string;
}): boolean {
  const currentDate = new Date();
  const expirationDate = new Date(giftCard.expirationDate);

  return giftCard.balance > 0 && expirationDate > currentDate;
}
