import { Button } from "@/components/ui/button";
import { CollectionDBType } from "@/types/collection/CollectionTypes/collectionTypes";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CollectionActions from "./CollectionActions";
import { SelectedCollection } from "./CollectionsPage";

// Fonction pour générer les colonnes
export const CollectionColumns = (
  isDeleteOpen: boolean,
  isEditOpen: boolean,
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleDeleteCollection: () => void,
  handleEditCollection: (updatedLabel: string) => void,
  selectedCollection: SelectedCollection,
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<SelectedCollection>
  >
): ColumnDef<CollectionDBType>[] => [
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
      const collection = row.original;

      return (
        <CollectionActions
          collectionId={collection._id}
          label={collection.label}
          isDeleteOpen={isDeleteOpen}
          isEditOpen={isEditOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          handleDeleteCollection={handleDeleteCollection}
          handleEditCollection={handleEditCollection}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
        />
      );
    },
  },
];
