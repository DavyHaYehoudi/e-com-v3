import { ColumnDef } from "@tanstack/react-table";
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
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/pricesFormat";
import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";

export const columns: ColumnDef<OrderCustomerDBType>[] = [
  {
    accessorKey: "orderStatusId",
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
      const label = row.original.orderStatusLabel; // Récupère le label
      const color = row.original.orderStatusColor; // Récupère la couleur

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
    accessorKey: "paymentStatusId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Paiement
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label = row.original.paymentStatusLabel; // Récupère le label
      const color = row.original.paymentStatusColor; // Récupère la couleur

      return (
        <Badge style={{ color: color }} className="text-white text-center">
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "orderNumber",
    header: "№ de commande",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("orderNumber")}</div>
    ),
  },
  {
    accessorKey: "cashbackEarned",
    header: () => <div className="text-right">Cashback capitalisé</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cashbackEarned"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "cashbackSpent",
    header: () => <div className="text-right">Cashback dépensé</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cashbackSpent"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "promocodeAmount",
    header: () => <div className="text-right">Montant du code promo</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("promocodeAmount"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPromotionOnProduct",
    header: () => <div className="text-right">Promotions des produits</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPromotionOnProduct"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "trackingNumber",
    header: () => <div className="text-right">Numéro de suivi</div>,
    cell: ({ row }) => {
      // const trackingNumber= row.getValue("trackingNumber");
      const trackingNumber = row.original.trackingNumber;

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {trackingNumber?.trackingNumber || "En cours..."}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
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
      const orderDate: string = row.getValue("createdAt");

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
      const orderId: string = row.original._id;
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
              <Link to="/contact"> Contacter un responsable</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
