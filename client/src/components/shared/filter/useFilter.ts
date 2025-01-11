import { useEffect, useState } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { CategoryDBType } from "@/types/CategoryTypes";
import { TagDBType } from "@/types/TagTypes";
import { CollectionDBType } from "@/types/collectionTypes";

export const useFilter = (
  onFilter: (filters: {
    name: string;
    collections: string[];
    categories: string[];
    tags: string[];
    priceRange: { min?: number; max?: number };
    isOnSale: boolean;
    isNew: boolean;
    cashback: boolean;
  }) => void
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({
    min: undefined,
    max: undefined,
  });
  const [isOnSale, setIsOnSale] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [cashback, setCashback] = useState<boolean>(false);

  const { data: collections, triggerFetch: fetchCollections } =
    useFetch<CollectionDBType[]>("/collections");
  const { data: categories, triggerFetch: fetchCategories } =
    useFetch<CategoryDBType[]>("/categories");
  const { data: tags, triggerFetch: fetchTags } =
    useFetch<TagDBType[]>("/tags");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCollections(); // Appel pour les collections
        await fetchCategories(); // Appel pour les catégories
        await fetchTags(); // Appel pour les tags
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [fetchCollections, fetchCategories, fetchTags]);

  const handleCollectionChange = (id: string) => {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const handleCategoryChange = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const handleTagChange = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    setPriceRange({ ...priceRange, [type]: Number(e.target.value) });
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSubmit = () => {
    const filters = {
      name,
      collections: selectedCollections,
      categories: selectedCategories,
      tags: selectedTags,
      priceRange,
      isOnSale,
      isNew,
      cashback
    };
    onFilter(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setSelectedCollections([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setPriceRange({ min: undefined, max: undefined });
    setIsOnSale(false);
    setIsNew(false);
    setCashback(false);
    setName("");
    onFilter({
      name: "",
      collections: [],
      categories: [],
      tags: [],
      priceRange: { min: undefined, max: undefined },
      isOnSale: false,
      isNew: false,
      cashback: false,
    });
  };

  return {
    isOpen,
    setIsOpen,
    collections,
    categories,
    tags,
    selectedCollections,
    selectedCategories,
    selectedTags,
    priceRange,
    isOnSale,
    setIsOnSale,
    isNew,
    setIsNew,
    cashback,
    setCashback,
    name,
    handleCollectionChange,
    handleCategoryChange,
    handleTagChange,
    handlePriceChange,
    handleNameChange,
    handleSubmit,
    resetFilters,
  };
};
