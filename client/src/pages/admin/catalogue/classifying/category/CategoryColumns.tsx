import { Button } from "@/components/ui/button";
import { CategoryDBType } from "@/types/CategoryTypes";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CategoryActions from "./CategoryActions";
import { SelectedCategory } from "./CategoriesPage";

// Fonction pour générer les colonnes
export const CategoryColumns = (
  isDeleteOpen: boolean,
  isEditOpen: boolean,
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleDeleteCategory: () => void,
  handleEditCategory: (updatedLabel: string) => void,
  selectedCategory: SelectedCategory,
  setSelectedCategory: React.Dispatch<React.SetStateAction<SelectedCategory>>
): ColumnDef<CategoryDBType>[] => [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("label")}</div>,
    meta: { headerName: "Label" },
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produits associés
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("productCount")}</div>,
    meta: { headerName: "Produits associés" },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de création
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = formatDate(row.getValue("createdAt"));

      return <div>{date}</div>;
    },
    meta: { headerName: "Date de création" },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <CategoryActions
          categoryId={category._id}
          label={category.label}
          isDeleteOpen={isDeleteOpen}
          isEditOpen={isEditOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      );
    },
  },
];
