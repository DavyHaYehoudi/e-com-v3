import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { ProductDBType } from "@/types/ProductTypes";

export interface FilterType {
  name: string;
  collections: string[];
  categories: string[];
  tags: string[];
  priceRange: { min?: number; max?: number };
  isOnSale: boolean;
  isNew: boolean;
  cashback: boolean;
}

export const useProductFilter = () => {
  const [filters, setFilters] = useState<FilterType>({
    name: "",
    collections: [] as string[],
    categories: [] as string[],
    tags: [] as string[],
    priceRange: { min: undefined, max: undefined },
    isOnSale: false,
    isNew: false,
    cashback: false,
  });

  const [queryUrl, setQueryUrl] = useState("/products");
  const {
    data: allProducts,
    loading,
    error,
    triggerFetch,
  } = useFetch<ProductDBType[]>(queryUrl);

  useEffect(() => {
    triggerFetch(); // Fetch des produits star au chargement de la page
  }, [queryUrl, triggerFetch]);

  // Fonction pour mettre à jour les filtres et régénérer l'URL des query params
  const handleFilterSubmit = (newFilters: FilterType) => {
    setFilters(newFilters);

    const queryParams = new URLSearchParams();

    if (newFilters.name) {
      queryParams.append("name", newFilters.name);
    }

    if (newFilters.collections.length > 0) {
      newFilters.collections.forEach((collectionId) => {
        queryParams.append("collectionIds", collectionId);
      });
    }
    if (newFilters.categories.length > 0) {
      newFilters.categories.forEach((categoryId) => {
        queryParams.append("categoryIds", categoryId);
      });
    }

    if (newFilters.tags.length > 0) {
      newFilters.tags.forEach((tagId) => {
        queryParams.append("tagIds", tagId);
      });
    }

    if (newFilters.priceRange.min !== undefined) {
      queryParams.append("minPrice", newFilters.priceRange.min.toString());
    }
    if (newFilters.priceRange.max !== undefined) {
      queryParams.append("maxPrice", newFilters.priceRange.max.toString());
    }

    if (newFilters.isOnSale) {
      queryParams.append("onPromotion", "true");
    }
    if (newFilters.isNew) {
      queryParams.append("isNew", "true");
    }
    if (newFilters.cashback) {
      queryParams.append("cashback", "true");
    }

    setQueryUrl(`/products?${queryParams.toString()}`);
  };

  useEffect(() => {
    handleFilterSubmit(filters); // Initialiser les filtres dès le montage du hook
  }, []);

  return { allProducts, loading, error, handleFilterSubmit };
};
