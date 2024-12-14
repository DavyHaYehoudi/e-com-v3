import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CashbackInCustomerDB,
  CustomerDBType,
} from "@/types/customer/CustomerTypes";
import { formatPrice } from "@/utils/pricesFormat";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<CustomerDBType>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prénom
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
    meta: { headerName: "Prénom" },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("lastName")}</div>
    ),
    meta: { headerName: "Nom" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    meta: { headerName: "Email" },
  },
  {
    accessorKey: "ordersTotalCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nbre d'achats
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("ordersTotalCount")}</div>
      );
    },
    meta: { headerName: "Nbre d'achats" },
  },
  {
    accessorKey: "ordersTotalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total acheté
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = formatPrice(row.getValue("ordersTotalAmount"));
      return <div className=" font-medium">{amount}</div>;
    },
    meta: { headerName: "Total acheté" },
  },
  {
    accessorKey: "cashback",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cashback
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashbackHistory: CashbackInCustomerDB[] = row.getValue("cashback");
      const cashbackEarned =
        cashbackHistory.length > 0
          ? cashbackHistory.reduce((acc, row) => acc + row.cashbackEarned, 0)
          : 0;
      const cashbackSpent =
        cashbackHistory.length > 0
          ? cashbackHistory.reduce((acc, row) => acc + row.cashbackSpent, 0)
          : 0;
      const cashback = formatPrice(cashbackEarned - cashbackSpent);
      return <div className="font-medium">{cashback}</div>;
    },
    meta: { headerName: "Cashback" },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                to={`/admin/tableau-de-bord/activite/clients/${customer._id}/offrir-carte-cadeau`}
              >
                Offrir une carte cadeau
              </Link>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={`/admin/tableau-de-bord/activite/clients/${customer._id}/offrir-cashback`}
              >
                Offrir du cashback
              </Link>{" "}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to={`/admin/tableau-de-bord/activite/clients/${customer._id}/fiche`}
              >
                Voir la fiche client
              </Link>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={`/admin/tableau-de-bord/activite/clients/${customer._id}/historique`}
              >
                {" "}
                Voir l'historique
              </Link>{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
