import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { useState } from "react";
import NavBackDashboard from "@/components/shared/NavBackDashboard";

// Mock de données
const mockReviews = [
  {
    id: 1,
    customer: {
      avatarUrl: "https://via.placeholder.com/40",
      firstName: "John",
      lastName: "Doe",
    },
    rating: 4,
    reviewText: "Excellent produit, je recommande !",
    dateFormatted: "2024-12-15",
    status: "pending", // approved, pending, refused
  },
  {
    id: 2,
    customer: {
      avatarUrl: "",
      firstName: "Jane",
      lastName: "Smith",
    },
    rating: 5,
    reviewText: "Service parfait et produit conforme.",
    dateFormatted: "2024-12-14",
    status: "approved",
  },
  {
    id: 3,
    customer: {
      avatarUrl: "https://via.placeholder.com/40",
      firstName: "Alice",
      lastName: "Johnson",
    },
    rating: 3,
    reviewText: "Bon produit mais délai de livraison trop long.",
    dateFormatted: "2024-12-13",
    status: "refused",
  },
  {
    id: 4,
    customer: {
      avatarUrl: "",
      firstName: "Tom",
      lastName: "Hardy",
    },
    rating: 2,
    reviewText: "Produit non conforme à la description.",
    dateFormatted: "2024-12-12",
    status: "pending",
  },
  // Ajouter d'autres mock ici
];

// Composant pour le badge de statut
const ReviewStatusBadge = ({ status }: { status: string }) => {
  const statusColors = {
    approved: "bg-green-500 text-white",
    pending: "bg-yellow-500 text-white",
    refused: "bg-red-500 text-white",
  };
  return (
    <Badge className={`${statusColors[status]} capitalize`}>{status}</Badge>
  );
};

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState(mockReviews);

  // Mettre à jour le statut d'un avis
  const updateReviewStatus = (id: number, newStatus: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, status: newStatus } : review
      )
    );
  };

  return (
    <div>
      <NavBackDashboard
        path="commandes/liste"
        text="Revenir à la liste des commandes"
        role="customer"
      />
      <div className="p-4 md:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des avis produits</CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-6"
              >
                {/* Avatar */}
                <Avatar>
                  <AvatarImage
                    src={review.customer.avatarUrl}
                    alt={`${review.customer.firstName} ${review.customer.lastName}`}
                  />
                  <AvatarFallback>
                    {review.customer.firstName[0]}
                    {review.customer.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                {/* Contenu */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">
                    {review.customer.firstName} {review.customer.lastName}
                  </h3>
                  <div className="flex items-center space-x-3 mt-1">
                    {/* Note avec étoiles */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    {/* Date */}
                    <div className="text-xs text-gray-500">
                      {review.dateFormatted}
                    </div>
                    {/* Statut */}
                    <ReviewStatusBadge status={review.status} />
                  </div>
                  {/* Texte */}
                  <p className="mt-2 text-sm text-gray-700">
                    {review.reviewText}
                  </p>
                </div>

                {/* Sélecteur de statut */}
                <div className="w-full md:w-auto">
                  <Select
                    value={review.status}
                    onValueChange={(value) =>
                      updateReviewStatus(review.id, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Modifier le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Publié</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="refused">Refusé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            <Separator className="my-6" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReviewsPage;
