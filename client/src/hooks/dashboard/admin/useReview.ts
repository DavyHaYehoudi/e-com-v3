import { useFetch } from "@/service/hooks/useFetch";
import { ReviewDBType } from "@/types/review/ReviewTypes";

const useReviews = (reviewId?: string) => {
  const { triggerFetch: getAllReviews } = useFetch<ReviewDBType[]>(
    `/admin/reviews`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: approvedReview } = useFetch(
    `/admin/reviews/${reviewId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: deleteReview } = useFetch(
    `/admin/reviews/${reviewId}`,
    {
      method: "DELETE",
      requiredCredentials: true,
    }
  );

  return {
    getAllReviews,
    approvedReview,
    deleteReview,
  };
};

export default useReviews;
