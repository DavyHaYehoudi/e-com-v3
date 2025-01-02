export interface ProductDBType {
  _id: string;
  name: string;
  description: string;
  heroImage: string;
  promotionPercentage: number;
  promotionEndDate: Date | null;
  continueSelling: boolean;
  quantityInStock: number;
  price: number;
  newUntil: string; // ISO date string
  isPublished: boolean;
  cashback: number;
  collections: CollectionProductType[];
  categories: CategoryProductType[];
  tags: TagProductType[];
  variants: VariantProductType[];
  numberOfSales: number;
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
export interface CollectionProductType {
  _id: string;
  label: string;
}
export interface CategoryProductType {
  _id: string;
  label: string;
}
export interface TagProductType {
  _id: string;
  label: string;
}
