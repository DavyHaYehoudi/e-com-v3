// ReviewItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { ReviewItemType } from "@/app/(public)/types/ReviewTypes";

type ReviewItemProps = {
  review: ReviewItemType;
  index: number; // Index du review dans la liste des reviews
};

export function ReviewItem({ review, index }: ReviewItemProps) {
  const { review_text, rating, created_at, customer_id } = review;
  const dateFormatted = format(new Date(created_at), "dd MMM yyyy");

  // Simulate customer data retrieval; ideally replace this with actual customer data fetch
  const customer = {
    firstName: "John", // Remplace par les données réelles du client
    lastName: "Doe",
    avatarUrl: "/path/to/avatar.jpg",
  };

  return (
    <div className="flex items-start space-x-4 mt-8" key={index}>
      <Avatar>
        <AvatarImage
          src={customer.avatarUrl}
          alt={`${customer.firstName} ${customer.lastName}`}
        />
        <AvatarFallback>
          {customer.firstName[0]}
          {customer.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold text-sm">
          {customer.firstName} {customer.lastName}
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
          {review_text}
        </p>
      </div>
    </div>
  );
}
