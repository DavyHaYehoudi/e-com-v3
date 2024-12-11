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
import { ProfileFormData, profileSchema } from "./profileSchema";
import { DatePicker } from "./DatePicker";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profileFetch, updateProfile } = useCustomerInfo();

  // React Hook Form setup avec Zod
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      email_marketing_consent: false,
      birthday: "",
    },
  });

  // Charger les données du profil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileFetch();
        if (data) reset(data); // Remplit le formulaire avec les données reçues
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchProfile();
  }, [profileFetch, reset]);

  // Gestion de la soumission du formulaire
  const onSubmit = async (data: ProfileFormData) => {
    try {
      if (data.birthday) {
        data.birthday = new Date(data.birthday).toISOString().split("T")[0];
      }
      updateProfile(data);
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
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              {...register("first_name")}
              placeholder="Entrez votre prénom"
              disabled={!isEditing}
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Nom */}
          <div>
            <Label htmlFor="last_name">Nom</Label>
            <Input
              {...register("last_name")}
              placeholder="Entrez votre nom"
              disabled={!isEditing}
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
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
            <Label htmlFor="birthday">Date de naissance</Label>
            <Controller
              name="birthday"
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
            {errors.birthday && (
              <p className="text-sm text-red-500">{errors.birthday.message}</p>
            )}
          </div>

          {/* Consentement aux mails commerciaux */}
          <div className="flex items-center gap-2">
            <Label htmlFor="email_marketing_consent">
              Recevoir des emails commerciaux
            </Label>
            <Controller
              name="email_marketing_consent"
              control={control}
              render={({ field }) => (
                <Switch
                  id="email_marketing_consent"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!isEditing}
                  className="bg-gray-200  border-gray-300 dark:border-gray-500 "
                />
              )}
            />
            {errors.email_marketing_consent && (
              <p className="text-sm text-red-500">
                {errors.email_marketing_consent.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
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

export default Profile;
