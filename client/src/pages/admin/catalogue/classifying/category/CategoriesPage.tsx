import useCategory from "@/hooks/dashboard/admin/useCategory";
import { CategoryDBType } from "@/types/CategoryTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CategoryCreate from "./CategoryCreate";
import CategoriesList from "./CategoriesList";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export interface SelectedCategory {
  categoryId: string;
  label: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryDBType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    categoryId: "",
    label: "",
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getCategories, createCategory, deleteCategory, updateCategory } =
    useCategory(selectedCategory.categoryId);

  // Fonction pour récupérer tous les catégories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategories();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      toast.error("Impossible de charger vos informations.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = (label: string) => {
    const isExistedLabel = categories.some(
      (category) => category.label === label
    );
    if (isExistedLabel) {
      toast.error("Cette catégorie existe déjà.");
      return;
    }
    createCategory({ label }).then((result) => {
      if (result) {
        const formatResult = { ...result, productCount: 0 };
        setCategories((prevCategories) => [formatResult, ...prevCategories]);
        toast.success("Catégorie créée avec succès.");
      } else {
        toast.error("Erreur lors de la création de la catégorie.");
      }
    });
  };

  // Fonction pour supprimer une catégorie (appelée depuis CategoriesList)
  const handleDeleteCategory = () => {
    deleteCategory(selectedCategory.categoryId).then((result) => {
      if (!result) {
        return toast.error(
          "Impossible de supprimer la catégorie, des produits lui sont associés"
        );
      }

      setCategories((prevCategories) =>
        prevCategories.filter(
          (category) => category._id !== selectedCategory.categoryId
        )
      ); // Mettre à jour localement
      toast.success("Catégorie supprimée avec succès.");
    });
  };

  // Fonction pour update une catégorie
  const handleEditCategory = (updatedLabel: string) => {
    const isExistedLabel = categories.some(
      (category) => category.label === updatedLabel
    );
    if (isExistedLabel) {
      toast.error("Cette catégorie existe déjà.");
      return;
    }
    updateCategory({ label: updatedLabel.trim() }).then(() => {
      const updatedCategories = categories.map((category) =>
        category._id === selectedCategory.categoryId
          ? { ...category, label: updatedLabel }
          : category
      );
      setCategories(updatedCategories);
      toast.success("Catégorie modifiée avec succès.");
    });
  };

  // Charger les catégories au montage
  useEffect(() => {
    fetchCategories();
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center mb-10">Categories</h1>
      <CategoryCreate onAddCategory={handleAddCategory} />
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <CategoriesList
          data={categories}
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory}
          isEditOpen={isEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
