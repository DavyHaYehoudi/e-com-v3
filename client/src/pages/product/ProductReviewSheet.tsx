"use client";
import { ReviewItemType } from "@/app/(public)/types/ReviewTypes";
import { ReviewItem } from "@/components/shared/review/ReviewItem";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
const side = "bottom";

interface ProductReviewSheetProps {
  productId: number;
}

const ProductReviewSheet: React.FC<ProductReviewSheetProps> = ({productId}) => {
  const [reviews, setReviews] = useState<ReviewItemType[]>([]);
  const { data, triggerFetch } = useFetch<ReviewItemType[]>(`/reviews/${productId}`);

  useEffect(() => {
    triggerFetch();
  }, []);
  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key={side}>
        <SheetTrigger asChild>
          <span className="cursor-pointer whitespace-nowrap underline underline-offset-4 italic">
            {reviews.length > 0
              ? `${reviews.length} commentaire${reviews.length>1?"s":""} `
              : "Aucun avis pour le moment"}{" "}
          </span>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {reviews &&
            reviews.length > 0 &&
            reviews.map((review, index) => (
              <ReviewItem review={review} index={index} />
            ))}
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default ProductReviewSheet;
