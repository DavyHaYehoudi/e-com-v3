import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WishlistRowItem from "./WishlistRowItem";
import { useWishlistManager } from "@/hooks/useWishlistManager";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const WishlistTable = () => {
  const { productsWishlist } = useWishlistManager();
  if (!productsWishlist) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return productsWishlist && productsWishlist.length > 0 ? (
    <Table className="min-w-full text-l">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]"></TableHead>
          <TableHead className="w-[300px]"></TableHead>
          <TableHead className="w-[300px]"></TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <WishlistRowItem productsWishlistItems={productsWishlist} />
      </TableBody>
    </Table>
  ) : (
    <p className="font-bold text-center">
      Aucun produit dans votre liste de favoris.
    </p>
  );
};

export default WishlistTable;
