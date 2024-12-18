import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useReviews from "@/hooks/dashboard/customer/useReviews";
import { toast } from "sonner";

// Définition du schéma de validation avec Zod
const createReviewSchema = z.object({
  orderId: z.string().nullable().optional(),
  productId: z.string().nullable().optional(),
  reviewText: z
    .string()
    .min(1, { message: "Le texte du commentaire est requis." })
    .max(500, {
      message: "Le texte du commentaire ne peut pas dépasser 500 caractères.",
    }),
  rating: z
    .number()
    .min(1, { message: "Le nombre d'étoiles doit être au moins 1." })
    .max(5, { message: "Le nombre d'étoiles ne peut pas dépasser 5." })
    .default(5),
});

type CreateReviewFormType = z.infer<typeof createReviewSchema>;

interface ProductReviewProps {
  orderId?: string;
  productId?: string;
  productName: string;
  productImage: string;
}

const ProductReview: React.FC<ProductReviewProps> = ({
  orderId,
  productId,
  productName,
  productImage,
}) => {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const { createReview } = useReviews();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReviewFormType>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      orderId,
      productId,
      reviewText: "",
      rating: 5,
    },
  });

  const onSubmit = (data: CreateReviewFormType) => {
    const bodyData = {
      orderId,
      productId,
      reviewText: data.reviewText,
      rating,
    };
    createReview(bodyData)
      .then((result) => {
        if (result) {
          setRating(5);
          setReviewSubmitted(true);
          reset({
            orderId,
            productId,
            reviewText: "",
            rating: 5,
          });
          toast.error("Votre avis a été enregistré.");
        } else {
          toast.error("Un avis a déjà été donné pour ce produit.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du commentaire :", error);
        toast.error("Impossible d'enregistrer votre avis.");
      });
  };

  return (
    <Card className="border border-gray-200 p-3 rounded-lg shadow-sm max-w-md mx-auto">
      <CardHeader className="flex items-center gap-3">
        <img
          src={productImage}
          alt={productName}
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <p className="font-medium text-sm text-neutral-800 dark:text-neutral-100">
            {productName}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Champ de texte pour l'avis */}
          <div>
            <Textarea
              placeholder="Laissez votre avis..."
              {...register("reviewText")}
              disabled={reviewSubmitted} // Désactive le champ après soumission
              className="w-full text-sm border-neutral-300"
            />
            {errors.reviewText && (
              <p className="text-red-500 text-xs">
                {errors.reviewText.message}
              </p>
            )}
          </div>

          {/* Sélecteur d'étoiles */}
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 cursor-pointer ${
                  star <= rating ? "text-yellow-500" : "text-neutral-400"
                }`}
                onClick={() => !reviewSubmitted && setRating(star)} // Désactive le changement d'étoiles après soumission
              />
            ))}
            <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
              {rating}/5
            </span>
            {errors.rating && (
              <p className="text-red-500 text-xs">{errors.rating.message}</p>
            )}
          </div>

          {/* Message d'état après soumission */}
          {reviewSubmitted ? (
            <p className="text-green-500 text-sm">
              Votre avis a été envoyé ! <br />
              Il va être traité pour sa publication.
            </p>
          ) : (
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="w-full text-sm bg-blue-600 text-white hover:bg-blue-700"
                disabled={reviewSubmitted} // Désactive le bouton après soumission
              >
                Envoyer l'avis
              </Button>
            </CardFooter>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductReview;
