import { useEffect, useState } from "react";
import useReviews from "@/hooks/dashboard/admin/useReview";
import ReviewCard from "./ReviewCard";
import { ReviewDBType, StatusType } from "@/types/review/ReviewTypes";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<ReviewDBType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { getAllReviews } = useReviews();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await getAllReviews();
        if (response) {
          setReviews(response);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [getAllReviews]);

  if (loading) {
    return <p>Chargement des avis...</p>;
  }

  if (reviews.length === 0) {
    return <p>Aucun avis trouvé.</p>;
  }
  const handleEditStatus = (status: StatusType, reviewId: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((r) => (r._id === reviewId ? { ...r, status } : r))
    );
  };
  const handleDeleteReview = (reviewId: string) => {
    setReviews((prevReviews) => prevReviews.filter((r) => r._id !== reviewId));
  };

  return (
    <div>
      <h1 className="text-center mb-10">gerer les avis des clients</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            customerId={review.customerId}
            handleEditStatus={handleEditStatus}
            handleDeleteReview={handleDeleteReview}
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
            selectedReviewId={selectedReviewId}
            setSelectedReviewId={setSelectedReviewId}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
