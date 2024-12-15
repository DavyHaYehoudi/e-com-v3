import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Label } from "@/components/ui/label"; // ShadCN Label
import { Button } from "@/components/ui/button";
import CalendarCustom from "@/components/shared/CalendarCustom";
import useCustomerInfo from "@/hooks/dashboard/admin/useCustomer";
import { useEffect } from "react";
import { toast } from "sonner";
import { addYears, format } from "date-fns";
import useGiftcardsCustomer from "@/hooks/dashboard/admin/useGiftcard";
import { Link } from "react-router-dom";

// Schéma Zod pour validation
const giftCardSchema = z.object({
  emailCustomer: z.string().email(),
  initialValue: z
    .number()
    .min(1, "La valeur doit être supérieure à 0.")
    .max(10000, "La valeur ne peut pas dépasser 10 000."),
  expirationDate: z
    .date()
    .refine(
      (date) => date > new Date(),
      "La date d'expiration doit être dans le futur."
    ),
});

type GiftCardFormValues = z.infer<typeof giftCardSchema>;

const OfferGiftCard: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { customerInfoFetch } = useCustomerInfo(customerId);
  const { giftcardToOffer } = useGiftcardsCustomer();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GiftCardFormValues>({
    resolver: zodResolver(giftCardSchema),
    defaultValues: {
      emailCustomer: "",
      initialValue: 20,
      expirationDate: addYears(new Date(), 1), // Valeur par défaut en tant que Date
    },
  });

  const expirationDate = watch("expirationDate");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await customerInfoFetch();
        if (data) {
          // Met à jour l'état et le formulaire avec l'email du client
          setValue("emailCustomer", data.email);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchProfile();
  }, [customerInfoFetch, setValue]);

  const onSubmit: SubmitHandler<GiftCardFormValues> = (data) => {
    const bodyData = {
      firstHolderId: customerId,
      initialValue: data.initialValue,
      expirationDate: format(data.expirationDate, "yyyy-MM-dd"),
    };
    try {
      giftcardToOffer(bodyData);
      toast.success("Carte cadeau créée avec succès !");
    } catch (error) {
      console.log("Erreur lors de la création de la carte cadeau", error);
    }
  };

  return (
    <div>
      <p className="text-blue-300 m-5 text-xs">
        <Link to="/admin/tableau-de-bord/activite/clients/liste">
          Revenir à la liste
        </Link>{" "}
      </p>
      <div className="max-w-lg mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Offrir une Carte Cadeau
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email du Client */}
          <div className="flex flex-col">
            <Label
              htmlFor="emailCustomer"
              className="mb-2 text-gray-700 dark:text-gray-300"
            >
              Email du Client
            </Label>
            <Input
              type="text"
              id="emailCustomer"
              {...register("emailCustomer")}
              readOnly
              className="bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
            />
            {errors.emailCustomer && (
              <p className="text-sm text-red-400 mt-1">
                {errors.emailCustomer.message}
              </p>
            )}
          </div>

          {/* Valeur Initiale */}
          <div className="flex flex-col">
            <Label
              htmlFor="initialValue"
              className="mb-2 text-gray-700 dark:text-gray-300"
            >
              Valeur (€)
            </Label>
            <Input
              type="number"
              id="initialValue"
              {...register("initialValue", { valueAsNumber: true })}
              className="bg-gray-100 dark:bg-gray-700"
            />
            {errors.initialValue && (
              <p className="text-sm text-red-400 mt-1">
                {errors.initialValue.message}
              </p>
            )}
          </div>

          {/* Date d'Expiration */}
          <div className="flex flex-col">
            <Label
              htmlFor="expirationDate"
              className="mb-2 text-gray-700 dark:text-gray-300"
            >
              Date d'expiration
            </Label>
            <CalendarCustom
              value={expirationDate}
              onChange={(date) => setValue("expirationDate", date)}
              disabled={false}
            />
            {errors.expirationDate && (
              <p className="text-sm text-red-400 mt-1">
                {errors.expirationDate.message}
              </p>
            )}
          </div>

          {/* Bouton Soumettre */}
          <Button
            type="submit"
            className="w-full p-3 rounded-lg bg-teal-200 text-gray-800 font-medium hover:bg-teal-300 transition dark:bg-teal-700 dark:hover:bg-teal-600 dark:text-gray-100"
          >
            Offrir la Carte Cadeau
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OfferGiftCard;
