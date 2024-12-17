import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";
import GenericModal from "@/components/shared/dialog/GenericModal";
import { SelectedCategory } from "./CategoriesPage";

interface CategoryActionsProps {
  categoryId: string;
  label: string;
  isDeleteOpen: boolean;
  isEditOpen: boolean;
  handleDeleteCategory: () => void;
  handleEditCategory: (updatedLabel: string) => void;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: SelectedCategory;
  setSelectedCategory: React.Dispatch<React.SetStateAction<SelectedCategory>>;
}
const CategoryActions: React.FC<CategoryActionsProps> = ({
  categoryId,
  label,
  handleDeleteCategory,
  isDeleteOpen,
  isEditOpen,
  setIsDeleteOpen,
  setIsEditOpen,
  handleEditCategory,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <>
      <DeleteAlert
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        itemNameToDelete={selectedCategory.label}
        onConfirm={() => {
          handleDeleteCategory();
          setIsDeleteOpen(false);
          setSelectedCategory((prev) => ({
            ...prev,
            categoryId: "",
            label: "",
          }));
        }}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedCategory((prev) => ({
            ...prev,
            categoryId: "",
            label: "",
          }));
        }}
      />
      <GenericModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Modifier la categorie"
        fields={[
          {
            id: "label",
            label: "Nom de la catégorie",
            value: selectedCategory.label,
          },
        ]}
        onSubmit={(data) => {
          const updatedLabel = data["label"]; // Récupère la valeur modifiée
          handleEditCategory(updatedLabel); // Appel de la fonction avec categoryId et updatedLabel
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsEditOpen(true);
                setSelectedCategory((prev) => ({ ...prev, categoryId, label }));
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100 hover:text-yellow-500 "
            >
              <SquarePen className="h-4 w-4" />{" "}
              <span className="ml-2">Modifier</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
                setSelectedCategory((prev) => ({ ...prev, categoryId, label }));
              }}
              className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <Trash2 className="h-4 w-4" />{" "}
              <span className="ml-2">Supprimer</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CategoryActions;
