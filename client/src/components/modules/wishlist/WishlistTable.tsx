import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WishlistRowItem from "./WishlistRowItem";
import { useWishlistManager } from "../../../hooks/useWishlistManager";

const WishlistTable = () => {
  const { productsWishlist } = useWishlistManager();
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
