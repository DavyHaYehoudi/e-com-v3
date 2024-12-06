export interface ProductDBType {
  _id: string;
  name: string;
  description: string;
  heroImage: string;
  promotionPercentage: number;
  promotionEndDate: string; // ISO date string
  continueSelling: boolean;
  quantityInStock: number;
  price: number;
  newUntil: string; // ISO date string
  isPublished: boolean;
  cashback: number;
  categories: Array<{
    _id: string;
    label: string;
  }>;
  tags: TagProductType[];
  variants: VariantProductType[];
  isStar: boolean;
  isArchived: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
export interface VariantProductType {
  combination: string;
  mainImage: string;
  secondaryImages: string[];
  _id: string;
}
export interface TagProductType {
  _id: string;
  label: string;
}
