// ReviewItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { ReviewDBType } from "@/types/ReviewTypes";

type ReviewItemProps = {
  review: ReviewDBType;
  index: number; // Index du review dans la liste des reviews
};

export function ReviewItem({ review, index }: ReviewItemProps) {
  const { reviewText, rating, createdAt } = review;
  const dateFormatted = format(new Date(createdAt), "dd MMM yyyy");

  return (
    <div className="flex items-start space-x-4 mt-8" key={index}>
      <Avatar>
        <AvatarImage
          src={review.customerId.avatarUrl}
          alt={`${review.customerId.firstName} ${review.customerId.lastName}`}
        />
        <AvatarFallback>
          {review.customerId.firstName[0]}
          {review.customerId.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold text-sm">
          {review.customerId.firstName} {review.customerId.lastName}
        </h3>

        <div className="flex items-center space-x-1  gap-5">
          <div className="flex items-center space-x-1">
            {" "}
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="text-xs text-gray-500">{dateFormatted}</div>
        </div>
        <p className="mt-2 text-gray-700 dark:text-[var(--whiteSmoke)] text-sm">
          {reviewText}
        </p>
      </div>
    </div>
  );
}
