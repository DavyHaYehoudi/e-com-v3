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
import { IdentityFormData, identitySchema } from "./identitySchema";
import CalendarCustom from "@/components/shared/CalendarCustom";
import { Checkbox } from "@/components/ui/checkbox";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

const Identity = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        const data = await customerInfoFetch();
        if (data) reset(data); // Remplit le formulaire avec les données reçues
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
  const onSubmit = async (data: IdentityFormData) => {
    try {
      if (data.birthdate) {
        data.birthdate = new Date(data.birthdate).toISOString().split("T")[0];
      }
      customerInfoUpdate(data);
      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Impossible de mettre à jour vos informations.");
    }
  };

  if (isLoading) {
    return <FullscreenLoader />;
  }
  return (
    <Card className="w-full max-w-lg mx-auto p-4">
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
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <Label htmlFor="lastName">Nom</Label>
            <Input {...register("lastName")} placeholder="Entrez votre nom" />
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
                <CalendarCustom
                  captionLayout="dropdown"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date.toISOString().split("T")[0])
                  }
                  startMonth={new Date(1960, 0)}
                  endMonth={new Date(2010, 11)}
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
                  <Checkbox
                    id="emailMarketingConsent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="emailMarketingConsent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Recevoir des emails commerciaux
                  </label>
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
          <Button type="submit">Enregistrer</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Identity;
