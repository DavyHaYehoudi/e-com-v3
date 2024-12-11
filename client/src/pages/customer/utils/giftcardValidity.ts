export function isGiftCardValid(giftCard: {
  balance: number;
  expiration_date: string;
}): boolean {
  const currentDate = new Date();
  const expirationDate = new Date(giftCard.expiration_date);

  return giftCard.balance > 0 && expirationDate > currentDate;
}
