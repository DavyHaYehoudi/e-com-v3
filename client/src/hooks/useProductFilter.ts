import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { ProductDBType } from "@/types/product/ProductTypes";

interface Filter {
  name: string;
  categories: string[];
  tags: string[];
  priceRange: { min?: number; max?: number };
  isOnSale: boolean;
  isNew: boolean;
}

export const useProductFilter = () => {
  const [filters, setFilters] = useState<Filter>({
    name: "",
    categories: [] as string[],
    tags: [] as string[],
    priceRange: { min: undefined, max: undefined },
    isOnSale: false,
    isNew: false,
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
  const handleFilterSubmit = (newFilters: Filter) => {
    setFilters(newFilters);

    const queryParams = new URLSearchParams();

    if (newFilters.name) {
      queryParams.append("name", newFilters.name);
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

    setQueryUrl(`/products?${queryParams.toString()}`);
  };

  useEffect(() => {
    handleFilterSubmit(filters); // Initialiser les filtres dès le montage du hook
  }, []);

  return { allProducts, loading, error, handleFilterSubmit };
};
