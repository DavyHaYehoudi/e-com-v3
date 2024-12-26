import { Button } from "@/components/ui/button";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import OrderActions from "./OrderActions";
import { SelectedOrder } from "./OrdersPage";
import { formatPrice } from "@/utils/pricesFormat";
import { Badge } from "@/components/ui/badge";

// Fonction pour générer les colonnes
export const OrderColumns = (
  isDeleteOpen: boolean,
  isEditOpen: boolean,
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleDeleteOrder: () => void,
  handleEditOrder: (updatedLabel: string) => void,
  selectedOrder: SelectedOrder,
  setSelectedOrder: React.Dispatch<React.SetStateAction<SelectedOrder>>
): ColumnDef<OrderCustomerDBType>[] => [
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
    meta: { headerName: "Etape" },
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
    meta: { headerName: "Paiement" },
  },
  {
    accessorKey: "customerId",
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
    cell: ({ row }) => {
      const firstname = row.original.customerId.firstName;
      const lastName = row.original.customerId.lastName;

      return <div>{firstname + " " + lastName}</div>;
    },
    meta: { headerName: "Nom" },
  },
  {
    accessorKey: "orderNumber",
    header: "№ de commande",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("orderNumber")}</div>
    ),
    meta: { headerName: "№ de commande" },
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
    meta: { headerName: "Cashback capitalisé" },
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
    meta: { headerName: "Cashback dépensé" },
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
    meta: { headerName: "Montant du code promo" },
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
    meta: { headerName: "Promotion des produits" },
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
    meta: { headerName: "№ de suivi" },
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
    meta: { headerName: "Total" },
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
    meta: { headerName: "Date" },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <OrderActions
          orderId={order._id}
          label={`la commande № ${order.orderNumber}`}
          isDeleteOpen={isDeleteOpen}
          isEditOpen={isEditOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          handleDeleteOrder={handleDeleteOrder}
          handleEditOrder={handleEditOrder}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      );
    },
  },
];
