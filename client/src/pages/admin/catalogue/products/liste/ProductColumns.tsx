import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ValidBadge from "@/components/shared/badge/ValidBadge";
import NoValidBadge from "@/components/shared/badge/NoValidBadge";
import { ProductDBType } from "@/types/product/ProductTypes";
import { isProductNew, isProductOnSale } from "@/utils/productUtils";
import { formatPrice } from "@/utils/pricesFormat";
import ProductActions from "./ProductActions";
import { SelectedProduct } from "./ProductsPageAdmin";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import NewBadge from "@/components/shared/badge/NewBadge";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";

// Fonction pour générer les colonnes
export const ProductColumns = (
  isDeleteOpen: boolean,
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleDeleteProduct: () => void,
  selectedProduct: SelectedProduct,
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProduct>>
): ColumnDef<ProductDBType>[] => [
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    meta: { headerName: "Nom" },
  },
  {
    accessorKey: "heroImage",
    header: () => {
      return <div>Image</div>;
    },
    cell: ({ row }) => (
      <div>
        {" "}
        <img
          src={row.getValue("heroImage")}
          alt="Image du produit"
          className="h-12 w-12 rounded-md object-cover"
        />
      </div>
    ),
    meta: { headerName: "Image" },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatPrice(row.getValue("price"))}</div>,
    meta: { headerName: "Prix" },
  },
  {
    accessorKey: "quantityInStock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("quantityInStock")}</div>,
    meta: { headerName: "Stock" },
  },
  {
    accessorKey: "promotionPercentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Promotion
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      const isProductPromotion = isProductOnSale(
        product.promotionPercentage,
        product.promotionEndDate
      );

      return (
        <div>
          {isProductPromotion ? (
            <PromotionBadge
              promotionPercentage={product.promotionPercentage}
              promotionEndDate={product.promotionEndDate}
            />
          ) : (
            ""
          )}
        </div>
      );
    },
    meta: { headerName: "Promotion" },
  },
  {
    accessorKey: "newUntil",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Attribut
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>{isProductNew(row.getValue("newUntil")) ? <NewBadge /> : ""}</div>
      );
    },
    meta: { headerName: "Attribut" },
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
      const cashbackAmount: number = row.getValue("cashback");
      return (
        <div>
          {cashbackAmount > 0 ? (
            <CashbackBadge cashbackAmount={cashbackAmount} />
          ) : (
            ""
          )}
        </div>
      );
    },
    meta: { headerName: "Cashback" },
  },
  {
    accessorKey: "numberOfSales",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre de ventes
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("numberOfSales")}</div>;
    },
    meta: { headerName: "Nombre de ventes" },
  },
  {
    accessorKey: "isPublished",
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
      const isPublished = row.getValue("isPublished");

      return (
        <div>
          {isPublished ? (
            <ValidBadge label="publié" />
          ) : (
            <NoValidBadge label="suspendu" />
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
      const product = row.original;

      return (
        <ProductActions
          productId={product._id}
          name={product.name}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          handleDeleteProduct={handleDeleteProduct}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      );
    },
  },
];
