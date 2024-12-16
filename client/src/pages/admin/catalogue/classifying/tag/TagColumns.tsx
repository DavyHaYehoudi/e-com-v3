import { Button } from "@/components/ui/button";
import { TagDBType } from "@/types/tag/TagTypes";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import TagActions from "./TagActions";
import { SelectedTag } from "./TagsPage";

// Fonction pour générer les colonnes
export const TagColumns = (
  isDeleteOpen: boolean,
  isEditOpen: boolean,
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleDeleteTag: () => void,
  handleEditTag: (updatedLabel: string) => void,
  selectedTag: SelectedTag,
  setSelectedTag: React.Dispatch<React.SetStateAction<SelectedTag>>
): ColumnDef<TagDBType>[] => [
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
      const tag = row.original;

      return (
        <TagActions
          tagId={tag._id}
          label={tag.label}
          isDeleteOpen={isDeleteOpen}
          isEditOpen={isEditOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          handleDeleteTag={handleDeleteTag}
          handleEditTag={handleEditTag}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      );
    },
  },
];
