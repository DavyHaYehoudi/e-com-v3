import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReviewDBType } from "@/types/ReviewTypes";
import React from "react";

interface ReviewsSummaryProps {
  reviews: ReviewDBType[];
}
const ReviewsSummary: React.FC<ReviewsSummaryProps> = ({ reviews }) => {
  return (
    <div className="whitespace-nowrap flex items-center gap-2 ">
      {reviews &&
        reviews.map((review) => (
          <TooltipProvider key={review._id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-[25px] h-[25px]">
                  <AvatarImage
                    src={review.customerId.avatarUrl}
                    alt={`${review.customerId.firstName} ${review.customerId.lastName}`}
                  />
                  <AvatarFallback>
                    {review.customerId.firstName[0]}
                    {review.customerId.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {review.customerId.firstName} {review.customerId.lastName}{" "}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </div>
  );
};

export default ReviewsSummary;
