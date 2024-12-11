import { ColumnDef } from "@tanstack/react-table";
import { OrderCustomer } from "../../../../hooks/dashboard/customer/useOrdersCustomer";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClipboardButton from "@/components/shared/ClipboardButton";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/pricesFormat";
import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";

export const columns: ColumnDef<OrderCustomer>[] = [
  {
    accessorKey: "order_status_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Etape
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label = row.original.order_status_label; // Récupère le label
      const color = row.original.order_status_color; // Récupère la couleur

      return (
        <Badge
          style={{ backgroundColor: color }}
          className="text-white text-center"
        >
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "payment_status_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label = row.original.payment_status_label; // Récupère le label
      const color = row.original.payment_status_color; // Récupère la couleur

      return (
        <Badge style={{ color: color }} className="text-white text-center">
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "confirmation_number",
    header: "№ de commande",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("confirmation_number")}</div>
    ),
  },
  {
    accessorKey: "shipping_price",
    header: () => <div className="text-right">Livraison</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("shipping_price"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },

  {
    accessorKey: "cashback_earned",
    header: () => <div className="text-right">Cashback capitalisé</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cashback_earned"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "cashback_spent",
    header: () => <div className="text-right">Cashback dépensé</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cashback_spent"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "code_promo_amount",
    header: () => <div className="text-right">Montant du code promo</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("code_promo_amount"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "total_promo_products",
    header: () => <div className="text-right">Promotions des produits</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_promo_products"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_price"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const orderDate: string = row.getValue("created_at");

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatDate(orderDate)}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const orderNumber: string = row.getValue("confirmation_number");
      const orderId: number = row.original.id;
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
            <DropdownMenuItem className="flex flex-col">
              <span>Copier le numéro de commande</span>
              <span className="flex items-center gap-2">
                {" "}
                {orderNumber}
                <ClipboardButton text={orderNumber} />
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to={`/customer/tableau-de-bord/commandes/${orderId}/contenu`}
              >
                {" "}
                Voir le contenu
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={`/customer/tableau-de-bord/commandes/${orderId}/livraison`}
              >
                {" "}
                Suivre la livraison
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={`/customer/tableau-de-bord/commandes/${orderId}/numeros-de-suivi`}
              >
                {" "}
                Numéros de suivi
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={`/customer/tableau-de-bord/commandes/${orderId}/contacter-responsable`}
              >
                {" "}
                Contacter un responsable
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
