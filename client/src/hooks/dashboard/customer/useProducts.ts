import { useFetch } from "@/service/hooks/useFetch";

// Typage pour une image
export interface ProductImage {
  url: string;
  is_main: boolean;
}

// Typage principal du produit
export interface Product {
  id: number;
  name: string;
  SKU: string;
  description: string;
  weight: number;
  discount_percentage: number;
  discount_end_date: string; // ISO 8601 date string
  continue_selling: boolean;
  quantity_in_stock: number;
  price: number;
  new_until: string; // ISO 8601 date string
  is_published: boolean;
  cash_back: number;
  is_star: boolean;
  is_archived: boolean;
  images: ProductImage[]; // Liste des images
  categories: number[]; // Liste des IDs de catégories
  tags: number[]; // Liste des IDs de tags
  variants: string[]; // Liste des variantes sous forme de chaîne
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

// Typage pour la liste complète
export type ProductsList = Product[];

const useProducts = (productId: number) => {
  const { triggerFetch: getProductById } = useFetch<Product>(
    `/products/${productId}`,
    {
      requiredCredentials: true,
    }
  );

  return {
    getProductById,
  };
};

export default useProducts;
