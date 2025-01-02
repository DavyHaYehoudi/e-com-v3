import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useCustomerInfo from "../../../hooks/dashboard/customer/useCustomerInfo";
import { toast } from "sonner";
import { AddressesFormValues, AddressesSchema } from "./addressesSchema";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ShippingAddress = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { customerInfoFetch, customerInfoUpdate } = useCustomerInfo();

  // React Hook Form setup avec Zod
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<AddressesFormValues>({
    resolver: zodResolver(AddressesSchema),
    defaultValues: {
      company: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      streetNumber: "",
      address1: "",
      address2: "",
      postalCode: "",
      city: "",
      country: "",
    },
  });

  // Charger les données de l'adresse de livraison
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await customerInfoFetch();
        if (data) reset(data.shippingAddress); // Remplit le formulaire avec les données reçues
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        toast.error("Impossible de charger vos informations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [customerInfoFetch, reset]);

  // Gestion de la soumission du formulaire
  const onSubmit = async (data: AddressesFormValues) => {
    try {
      customerInfoUpdate({ shippingAddress: data });
      toast.success("Adresse de livraison mise à jour avec succès !");
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Impossible de mettre à jour vos informations.");
    }
  };
  const handleEditClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Empêcher la soumission du formulaire
    setIsEditing(true); // Passer en mode édition
  };
  const handleCancelClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Empêcher la soumission du formulaire
    setIsEditing(false); // Passer en mode affichage
    reset(); // Réinitialiser le formulaire
  };
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <Card className="w-full max-w-lg mx-auto mt-6 p-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-6 h-6" />
          Mon adresse de livraison
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Prénom */}
          <div>
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              {...register("firstName")}
              placeholder="Entrez votre prénom"
              disabled={!isEditing}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <Label htmlFor="lastName">Nom</Label>
            <Input
              {...register("lastName")}
              placeholder="Entrez votre nom"
              disabled={!isEditing}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              {...register("phone")}
              placeholder="Entrez votre numéro de téléphone"
              disabled={!isEditing}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              placeholder="Entrez votre email"
              disabled={!isEditing}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Numéro de voie */}
          <div>
            <Label htmlFor="streetNumber">Numéro de voie</Label>
            <Input
              {...register("streetNumber")}
              placeholder="Entrez le numéro de voie"
              disabled={!isEditing}
            />
            {errors.streetNumber && (
              <p className="text-sm text-red-500">
                {errors.streetNumber.message}
              </p>
            )}
          </div>

          {/* Adresse principale */}
          <div>
            <Label htmlFor="address1">Adresse</Label>
            <Input
              {...register("address1")}
              placeholder="Entrez votre adresse"
              disabled={!isEditing}
            />
            {errors.address1 && (
              <p className="text-sm text-red-500">{errors.address1.message}</p>
            )}
          </div>

          {/* Adresse complémentaire */}
          <div>
            <Label htmlFor="address2">Complément d'adresse</Label>
            <Input
              {...register("address2")}
              placeholder="Entrez le complément d'adresse"
              disabled={!isEditing}
            />
            {errors.address2 && (
              <p className="text-sm text-red-500">{errors.address2.message}</p>
            )}
          </div>

          {/* Code postal */}
          <div>
            <Label htmlFor="postalCode">Code postal</Label>
            <Input
              {...register("postalCode")}
              placeholder="Entrez le code postal"
              disabled={!isEditing}
            />
            {errors.postalCode && (
              <p className="text-sm text-red-500">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          {/* Ville */}
          <div>
            <Label htmlFor="city">Ville</Label>
            <Input
              {...register("city")}
              placeholder="Entrez la ville"
              disabled={!isEditing}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Pays */}
          <div>
            <Label htmlFor="country">Pays</Label>
            <Input
              {...register("country")}
              placeholder="Entrez le pays"
              disabled={!isEditing}
            />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelClick}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </>
          ) : (
            <Button onClick={handleEditClick}>Modifier</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default ShippingAddress;
