import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Label } from "@/components/ui/label"; // ShadCN Label
import { Button } from "@/components/ui/button";
import CalendarCustom from "@/components/shared/CalendarCustom";

// Schéma Zod pour validation
const giftCardSchema = z.object({
  firstHolderId: z.string().nonempty("L'ID du client est requis."),
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GiftCardFormValues>({
    resolver: zodResolver(giftCardSchema),
    defaultValues: {
      firstHolderId: customerId || "",
      initialValue: 50,
      expirationDate: new Date(),
    },
  });

  const expirationDate = watch("expirationDate");

  const onSubmit: SubmitHandler<GiftCardFormValues> = (data) => {
    console.log("Gift Card Data Submitted: ", data);
    // Envoyer les données à l'API ou exécuter une logique supplémentaire ici
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Offrir une Carte Cadeau
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ID du Client */}
        <div className="flex flex-col">
          <Label
            htmlFor="firstHolderId"
            className="mb-2 text-gray-700 dark:text-gray-300"
          >
            ID du Client
          </Label>
          <Input
            type="text"
            id="firstHolderId"
            {...register("firstHolderId")}
            readOnly
            className="bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
          />
          {errors.firstHolderId && (
            <p className="text-sm text-red-400 mt-1">
              {errors.firstHolderId.message}
            </p>
          )}
        </div>

        {/* Valeur Initiale */}
        <div className="flex flex-col">
          <Label
            htmlFor="initialValue"
            className="mb-2 text-gray-700 dark:text-gray-300"
          >
            Valeur Initiale (€)
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
  );
};

export default OfferGiftCard;
