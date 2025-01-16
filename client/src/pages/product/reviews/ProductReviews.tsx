import { ReviewItem } from "@/pages/product/reviews/ReviewItem";
import { useFetch } from "@/service/hooks/useFetch";
import { ReviewDBType } from "@/types/ReviewTypes";
import { useEffect, useState } from "react";

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
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
    <div className="grid sm:grid-cols-2 grid-col-1 gap-2">
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewItem key={index} review={review} index={index} />
        ))
      ) : (
        <span className="italic text-gray-500">Aucun avis pour le moment</span>
      )}
    </div>
  );
};
export default ProductReviews;
