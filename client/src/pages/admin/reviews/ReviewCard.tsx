import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import useCustomerInfo from "@/hooks/dashboard/admin/useCustomer";
import { useEffect, useState } from "react";
import { ReviewDBType } from "@/types/review/ReviewTypes";
import { CustomerDBType } from "@/types/customer/CustomerTypes";
import useReviews from "@/hooks/dashboard/admin/useReview";
import { StatusType } from "./ReviewsPage";
import { toast } from "sonner";
import ReviewStatusBadge from "./ReviewStatusBadge";

interface ReviewCardProps {
  review: ReviewDBType;
  customerId: string;
  handleEditStatus: (status: StatusType, reviewId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  customerId,
  handleEditStatus,
}) => {
  const [customer, setCustomer] = useState<CustomerDBType | null>(null);
  const { customerInfoFetch } = useCustomerInfo(customerId);
  const { approvedReview } = useReviews(review._id);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const customerData = await customerInfoFetch();
        setCustomer(customerData || null);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des infos client :",
          error
        );
      }
    };

    fetchCustomerInfo();
  }, [review.customerId, customerInfoFetch]);

  if (!customer) {
    return <p>Chargement des informations client...</p>;
  }

  const updateReviewStatus = (newStatus: StatusType) => {
    approvedReview({ status: newStatus }).then((result) => {
      if (result) {
        handleEditStatus(newStatus, review._id);
        toast.success("Statut mis à jour avec succès.");
      } else {
        toast.error("Erreur lors de la mise à jour du statut de l'avis.");
      }
    });
  };

  return (
    <Card className="w-full max-w-lg p-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={customer.avatarUrl} alt="Avatar" />
              <AvatarFallback>
                {customer.firstName.charAt(0)}
                {customer.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">
                {customer.firstName} {customer.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <ReviewStatusBadge status={review.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="mt-2">{review.reviewText}</p>
        <Separator className="my-4" />
        <div className="flex space-x-4">
          <Select
            defaultValue={review.status}
            onValueChange={(value: StatusType) => updateReviewStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Changer le statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approuvé</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="refused">Refusé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
