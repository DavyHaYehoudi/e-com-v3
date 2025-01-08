import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, ListCollapse } from "lucide-react";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";
import { Link } from "react-router-dom";
import { SelectedProduct } from "./ProductsPageAdmin";

interface ProductActionsProps {
  productId: string;
  name: string;
  isDeleteOpen: boolean;
  handleDeleteProduct: () => void;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: SelectedProduct;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProduct>>;
}
const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  name,
  handleDeleteProduct,
  isDeleteOpen,
  setIsDeleteOpen,
  selectedProduct,
  setSelectedProduct,
}) => {
  return (
    <>
      <DeleteAlert
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        itemNameToDelete={`le produit - ${selectedProduct.name} -`}
        onConfirm={() => {
          handleDeleteProduct();
          setIsDeleteOpen(false);
          setSelectedProduct((prev) => ({
            ...prev,
            productId: "",
            name: "",
          }));
        }}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedProduct((prev) => ({
            ...prev,
            productId: "",
            name: "",
          }));
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base">
            <Link
              to={`/admin/tableau-de-bord/catalogue/produits/modifier/${productId}`}
              className="flex items-center gap-2 ml-2 py-2"
            >
              <ListCollapse className="h-4 w-4" /> <span>Voir le contenu</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
                setSelectedProduct((prev) => ({
                  ...prev,
                  productId,
                  name,
                }));
              }}
              className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <Trash2 className="h-4 w-4" />{" "}
              <span className="ml-2">Supprimer</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProductActions;
