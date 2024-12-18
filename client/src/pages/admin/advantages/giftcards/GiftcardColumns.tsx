import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { isPromocodeActive } from "@/utils/promocodeDate";
import ValidBadge from "@/components/shared/badge/ValidBadge";
import NoValidBadge from "@/components/shared/badge/NoValidBadge";
import { GiftcardCustomerDBType } from "@/types/giftcard/GiftcardTypes";
import { SelectedGiftcard } from "./GiftcardsPage";
import GiftcardActions from "./GiftcardActions";
import { isGiftCardValid } from "@/utils/giftcardValidity";

// Fonction pour générer les colonnes
export const GiftcardColumns = (
  isDeleteOpen: boolean,
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleDeleteGiftcard: () => void,
  selectedGiftcard: SelectedGiftcard,
  setSelectedGiftcard: React.Dispatch<React.SetStateAction<SelectedGiftcard>>
): ColumnDef<GiftcardCustomerDBType>[] => [
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
    accessorKey: "initialValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valeur initiale
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("initialValue")}</div>,
    meta: { headerName: "Valeur initiale" },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reste
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("balance")}</div>,
    meta: { headerName: "Reste" },
  },
  {
    accessorKey: "isIssuedByAdmin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Offre admin
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("isIssuedByAdmin")?"oui":"non"}</div>,
    meta: { headerName: "Offre admin" },
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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dernier usage
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = formatDate(row.getValue("updatedAt"));

      return <div>{date}</div>;
    },
    meta: { headerName: "Dernier usage" },
  },
  {
    accessorKey: "expirationDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date d'expiration
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = formatDate(row.getValue("expirationDate"));

      return <div>{date}</div>;
    },
    meta: { headerName: "Date d'expiration" },
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
      return (
        <div>
          {isGiftCardValid({balance:row.original.balance,expirationDate: row.original.expirationDate}) ? (
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
      const giftcard = row.original;

      return (
        <GiftcardActions
          giftcardId={giftcard._id}
          code={giftcard.code}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          handleDeleteGiftcard={handleDeleteGiftcard}
          selectedGiftcard={selectedGiftcard}
          setSelectedGiftcard={setSelectedGiftcard}
        />
      );
    },
  },
];
