import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { ProductDBType } from "@/types/product/ProductTypes";

interface Filter {
  name: string;
  collections: number[];
  categories: number[];
  tags: number[];
  priceRange: { min?: number; max?: number };
  isOnSale: boolean;
  isNew: boolean;
  isBestSeller: boolean;
}

export const useProductFilter = () => {
  const [filters, setFilters] = useState<Filter>({
    name: "",
    collections: [] as number[],
    categories: [] as number[],
    tags: [] as number[],
    priceRange: { min: undefined, max: undefined },
    isOnSale: false,
    isNew: false,
    isBestSeller: false,
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
  }, [queryUrl]);

  // Fonction pour mettre à jour les filtres et régénérer l'URL des query params
  const handleFilterSubmit = (newFilters: Filter) => {
    setFilters(newFilters);

    const queryParams = new URLSearchParams();

    if (newFilters.name) {
      queryParams.append("name", newFilters.name);
    }

    if (newFilters.collections.length > 0) {
      newFilters.collections.forEach((collectionId) => {
        queryParams.append("collection_ids", collectionId.toString());
      });
    }

    if (newFilters.categories.length > 0) {
      newFilters.categories.forEach((categoryId) => {
        queryParams.append("category_ids", categoryId.toString());
      });
    }

    if (newFilters.tags.length > 0) {
      newFilters.tags.forEach((tagId) => {
        queryParams.append("tag_ids", tagId.toString());
      });
    }

    if (newFilters.priceRange.min !== undefined) {
      queryParams.append("min_price", newFilters.priceRange.min.toString());
    }
    if (newFilters.priceRange.max !== undefined) {
      queryParams.append("max_price", newFilters.priceRange.max.toString());
    }

    if (newFilters.isOnSale) {
      queryParams.append("on_promotion", "true");
    }
    if (newFilters.isNew) {
      queryParams.append("is_new", "true");
    }
    if (newFilters.isBestSeller) {
      queryParams.append("sort_by_sales", "true");
    }

    setQueryUrl(`/products?${queryParams.toString()}`);
  };

  useEffect(() => {
    handleFilterSubmit(filters); // Initialiser les filtres dès le montage du hook
  }, []);

  return { allProducts, loading, error, handleFilterSubmit };
};
