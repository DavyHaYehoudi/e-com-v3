import { useFetch } from "@/service/hooks/useFetch";
import { ReviewDBType } from "@/types/review/ReviewTypes";

const useReviews = (reviewId?: string) => {
  const { triggerFetch: getAllReviews } = useFetch<ReviewDBType[]>(
    `/admin/reviews`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: approvedReview } = useFetch<ReviewDBType>(
    `/admin/reviews/${reviewId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );

  return {
    getAllReviews,
    approvedReview,
  };
};

export default useReviews;
