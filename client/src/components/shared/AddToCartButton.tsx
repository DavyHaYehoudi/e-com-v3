import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Header from "@/pages/cart-sheet/header/Header";
import Footer from "@/pages/cart-sheet/footer/Footer";
import Body from "@/pages/cart-sheet/body/Body";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartManager } from "@/hooks/useCartManager";
import { Button } from "@/components/ui/button";
import { ProductDBType } from "@/types/ProductTypes";

interface AddToCartButtonProps {
  product?: ProductDBType;
  selectedVariant?: string;
  quantity: number;
  amount?: number;
  type: "product" | "giftcard";
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedVariant,
  quantity,
  amount,
  type,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const { addOrUpdateProductInCart, addGiftcardInCart } = useCartManager();

  const onAddToCart = () => {
    if (type === "product" && product && selectedVariant) {
      const productFormatted = {
        productId: product._id,
        variant: selectedVariant,
        quantity,
        name: product?.name,
        heroImage: product?.heroImage,
        newUntil: product?.newUntil,
        price: product?.price,
        promotionPercentage: product?.promotionPercentage,
        promotionEndDate: product?.promotionEndDate,
        cashback: product?.cashback,
      };
      addOrUpdateProductInCart(productFormatted);
    } else if (type === "giftcard" && amount) {
      addGiftcardInCart(amount, quantity);
    }
    setIsSheetOpen(true);
  };

  return (
    <>
      <Button
        className="mx-auto block lg:w-1/2 uppercase bg-[var(--golden-2)] hover:bg-[var(--golden-2-hover)] dark:text-[var(--whiteSmoke)]"
        onClick={onAddToCart}
      >
        Ajouter au panier
      </Button>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger />
        <SheetContent className="flex flex-col h-full p-1 ">
          <SheetHeader>
            <SheetTitle>
              <Header />
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="flex-grow" asChild>
            <ScrollArea className="h-[875px] rounded-md border">
              <Body />
            </ScrollArea>
          </SheetDescription>
          <Footer />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddToCartButton;
