import { Button } from "@/components/ui/button";
import { PromocodeDBType } from "@/types/promocode/PromocodeTypes";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import PromocodeActions from "./PromocodeActions";
import { SelectedPromocode } from "./PromocodesPage";
import { isPromocodeActive } from "@/utils/promocodeDate";
import ValidBadge from "@/components/shared/badge/ValidBadge";
import NoValidBadge from "@/components/shared/badge/NoValidBadge";

// Fonction pour générer les colonnes
export const PromocodeColumns = (
  isDeleteOpen: boolean,
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleDeletePromocode: () => void,
  selectedPromocode: SelectedPromocode,
  setSelectedPromocode: React.Dispatch<React.SetStateAction<SelectedPromocode>>
): ColumnDef<PromocodeDBType>[] => [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
    meta: { headerName: "Code" },
  },
  {
    accessorKey: "promocodePercentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pourcentage (%)
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("promocodePercentage")}</div>,
    meta: { headerName: "Pourcentage" },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de début
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = formatDate(row.getValue("startDate"));

      return <div>{date}</div>;
    },
    meta: { headerName: "Date de début" },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de fin
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = formatDate(row.getValue("endDate"));

      return <div>{date}</div>;
    },
    meta: { headerName: "Date de fin" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Statut
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startDate: Date = row.getValue("startDate");
      const endDate: Date = row.getValue("endDate");

      return (
        <div>
          {isPromocodeActive(startDate, endDate) ? (
            <ValidBadge label="actif" />
          ) : (
            <NoValidBadge label="inactif" />
          )}{" "}
        </div>
      );
    },
    meta: { headerName: "Statut" },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const promocode = row.original;

      return (
        <PromocodeActions
          promocodeId={promocode._id}
          code={promocode.code}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          handleDeletePromocode={handleDeletePromocode}
          selectedPromocode={selectedPromocode}
          setSelectedPromocode={setSelectedPromocode}
        />
      );
    },
  },
];
