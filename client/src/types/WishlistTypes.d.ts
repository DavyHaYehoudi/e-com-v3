export interface WishlistManagerFrontType {
  _id: string;
  heroImage: string;
  name: string;
  newUntil: string;
  price: number;
  cashback: number;
  promotionPercentage: number;
  promotionEndDate: Date | null;
}
