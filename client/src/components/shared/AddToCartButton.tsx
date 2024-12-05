"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Header from "../pages/cart-sheet/header/Header";
import Footer from "../pages/cart-sheet/footer/Footer";
import Body from "../pages/cart-sheet/body/Body";
import { ScrollArea } from "../ui/scroll-area";
import { MasterProductsType, Product } from "@/app/(public)/types/ProductTypes";
import { useCartManager } from "@/app/(public)/panier/hooks/useCartManager";

interface AddToCartButtonProps {
  product?: Product | MasterProductsType;
  selectedVariant?: string;
  quantity: number;
  amount?: number;
  type: "item" | "giftCard";
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedVariant = "",
  quantity,
  amount,
  type = "item",
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const { addOrUpdateProduct } = useCartManager();

  const onAddToCart = () => {
    addOrUpdateProduct({ product, selectedVariant, quantity, amount, type });
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
