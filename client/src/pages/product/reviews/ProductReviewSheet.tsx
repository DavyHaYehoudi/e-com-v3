import { ReviewItem } from "@/pages/product/reviews/ReviewItem";
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
import { ReviewDBType } from "@/types/ReviewTypes";
import { useEffect, useState } from "react";
import ReviewsSummary from "./ReviewsSummary";

// const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
const side = "bottom";

interface ProductReviewSheetProps {
  productId: string;
}

const ProductReviewSheet: React.FC<ProductReviewSheetProps> = ({
  productId,
}) => {
  const [reviews, setReviews] = useState<ReviewDBType[]>([]);
  const { data, triggerFetch } = useFetch<ReviewDBType[]>(
    `/reviews/${productId}`
  );

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
          <div className="flex items-center gap-2">
            <span className="cursor-pointer whitespace-nowrap underline underline-offset-4 italic">
              {reviews.length > 0
                ? `${reviews.length} commentaire${
                    reviews.length > 1 ? "s" : ""
                  } `
                : "Aucun avis pour le moment"}{" "}
            </span>
            <ReviewsSummary reviews={reviews} />
          </div>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {reviews &&
            reviews.length > 0 &&
            reviews.map((review, index) => (
              <ReviewItem key={index} review={review} index={index} />
            ))}
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default ProductReviewSheet;
