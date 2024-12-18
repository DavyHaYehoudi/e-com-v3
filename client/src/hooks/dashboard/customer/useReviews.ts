import { useFetch } from "@/service/hooks/useFetch";
import { ReviewDBType } from "@/types/review/ReviewTypes";

const useReviews = () => {
  const { triggerFetch: createReview } = useFetch<ReviewDBType>(`/reviews`, {
    method: "POST",
    requiredCredentials: true,
  });

  return {
    createReview,
  };
};

export default useReviews;
