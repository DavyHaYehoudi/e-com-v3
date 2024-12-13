import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "./DatePicker";
import { IdentityFormData, identitySchema } from "./identitySchema";

const Identity = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { customerInfoFetch, customerInfoUpdate } = useCustomerInfo();

  // React Hook Form setup avec Zod
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IdentityFormData>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      emailMarketingConsent: false,
      birthdate: "",
    },
  });

  // Charger les données du profil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await customerInfoFetch();
        if (data) reset(data); // Remplit le formulaire avec les données reçues
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchProfile();
  }, [customerInfoFetch, reset]);

  // Gestion de la soumission du formulaire
  const onSubmit = async (data: IdentityFormData) => {
    try {
      if (data.birthdate) {
        data.birthdate = new Date(data.birthdate).toISOString().split("T")[0];
      }
      customerInfoUpdate(data);
      toast.success("Profil mis à jour avec succès !");
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

  return (
    <Card className="w-full max-w-lg mx-auto mt-6 p-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserRound className="w-6 h-6" />
          Mon profil
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

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              className="bg-gray-200 cursor-not-allowed dark:text-black"
              disabled
            />
            <p className="text-xs text-gray-500">
              L'email ne peut pas être modifié.
            </p>
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

          {/* Date de naissance */}
          <div>
            <Label htmlFor="birthdate">Date de naissance</Label>
            <Controller
              name="birthdate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : null} // Conversion explicite
                  onChange={(date) =>
                    field.onChange(date.toISOString().split("T")[0])
                  } // Renvoyer en ISO simple
                  disabled={!isEditing}
                />
              )}
            />
            {errors.birthdate && (
              <p className="text-sm text-red-500">{errors.birthdate.message}</p>
            )}
          </div>

          {/* Consentement aux mails commerciaux */}
          <div className="flex items-center gap-2">
            <Label htmlFor="emailMarketingConsent">
              {/* Recevoir des emails commerciaux */}
            </Label>
            <Controller
              name="emailMarketingConsent"
              control={control}
              render={({ field }) => (
                <>
                  <Switch
                    id="emailMarketingConsent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!isEditing}
                    className="bg-gray-200  border-gray-300 dark:border-gray-500 "
                  />
                  {field.value ? (
                    <span className="text-xs text-blue-500">
                      Je recevrai des mails commerciaux.
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">
                      Vous ne recevrez pas de mails commerciaux.
                    </span>
                  )}
                </>
              )}
            />
            {errors.emailMarketingConsent && (
              <p className="text-sm text-red-500">
                {errors.emailMarketingConsent.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={(event) => {
                  event.preventDefault(); // Empêche la soumission
                  setIsEditing(false); // Quitte le mode édition
                  reset();
                }}
              >
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

export default Identity;
