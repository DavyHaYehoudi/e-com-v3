import { useEffect, useState } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { CategoryTypes } from "@/app/(public)/types/CategoryTypes";
import { CollectionTypes } from "@/app/(public)/types/CollectionTypes";
import { TagTypes } from "@/app/(public)/types/TagTypes";

export const useFilter = (
  onFilter: (filters: {
    name: string;
    collections: number[];
    categories: number[];
    tags: number[];
    priceRange: { min?: number; max?: number };
    isOnSale: boolean;
    isNew: boolean;
    isBestSeller: boolean;
  }) => void
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({
    min: undefined,
    max: undefined,
  });

  const [isOnSale, setIsOnSale] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { data: collections, triggerFetch: fetchCollections } =
    useFetch<CollectionTypes[]>("/collections");
  const { data: categories, triggerFetch: fetchCategories } =
    useFetch<CategoryTypes[]>("/categories");
  const { data: tags, triggerFetch: fetchTags } = useFetch<TagTypes[]>("/tags");

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

  const handleCollectionChange = (id: number) => {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const handleTagChange = (id: number) => {
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
      isBestSeller,
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
    setIsBestSeller(false);
    setName("");
    onFilter({
      name: "",
      collections: [],
      categories: [],
      tags: [],
      priceRange: { min: undefined, max: undefined },
      isOnSale: false,
      isNew: false,
      isBestSeller: false,
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
    isBestSeller,
    setIsBestSeller,
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
