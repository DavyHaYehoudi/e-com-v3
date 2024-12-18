import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useCustomerInfo from "@/hooks/dashboard/admin/useCustomer";
import { useParams } from "react-router-dom";
import NavBackDashboard from "@/components/shared/NavBackDashboard";

// Schéma Zod pour la validation
const cashbackSchema = z.object({
  cashbackToEarn: z
    .number()
    .min(0, "Cashback doit être un nombre positif.")
    .optional()
    .nullable(),
  cashbackToSpent: z
    .number()
    .min(0, "Cashback doit être un nombre positif.")
    .optional()
    .nullable(),
  label: z.enum([
    "loyalty",
    "birthday",
    "review",
    "referral",
    "other",
    "correction",
  ]),
  emailCustomer: z.string().email(),
});

type CashbackFormValues = z.infer<typeof cashbackSchema>;

const ManageCashback: React.FC = () => {
  const [isCorrection, setIsCorrection] = useState(false);
  const { customerId } = useParams<{ customerId: string }>();
  const { customerCashbackUpdate, customerInfoFetch } =
    useCustomerInfo(customerId);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CashbackFormValues>({
    resolver: zodResolver(cashbackSchema),
    defaultValues: {
      cashbackToEarn: 0,
      cashbackToSpent: 0,
      label: "loyalty", // 'loyalty' sélectionné par défaut
      emailCustomer: "",
    },
  });
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
  // Surveiller le label sélectionné
  const selectedLabel = watch("label");

  // Gérer l'envoi des données
  const onSubmit: SubmitHandler<CashbackFormValues> = (data) => {
    // On détermine si on a un cashback à ajouter ou à déduire
    const cashbackData =
      selectedLabel === "correction"
        ? { cashbackToEarn: 0, cashbackToSpent: data.cashbackToSpent }
        : { cashbackToEarn: data.cashbackToEarn, cashbackToSpent: 0 };
    try {
      const bodyData = {
        cashbackEarned: cashbackData.cashbackToEarn,
        cashbackSpent: cashbackData.cashbackToSpent,
        label: data.label,
      };
      customerCashbackUpdate(bodyData);
      toast.success("Cashback mis à jour !");
    } catch (error) {
      console.log("Erreur lors de la mise à jour du cashback", error);
    }
  };

  return (
    <div>
      <NavBackDashboard
        path="activite/clients/liste"
        text="Revenir à la liste des clients"
        role="admin"
      />
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Gestion du Cashback
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
          {/* Sélecteur de type de cashback */}
          <div className="flex flex-col">
            <Label
              htmlFor="label"
              className="mb-2 text-gray-700 dark:text-gray-300"
            >
              Type de Cashback
            </Label>
            <Select
              // id="label"
              {...register("label")}
              onValueChange={(
                value:
                  | "loyalty"
                  | "birthday"
                  | "other"
                  | "review"
                  | "referral"
                  | "correction"
              ) => {
                setValue("label", value);
                setIsCorrection(value === "correction"); // Active/désactive la correction
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une raison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="loyalty">Fidélité</SelectItem>
                <SelectItem value="birthday">Anniversaire</SelectItem>
                <SelectItem value="review">Avis</SelectItem>
                <SelectItem value="referral">Parrainage</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
                <SelectItem
                  value="correction"
                  className="text-orange-500 font-bold"
                >
                  Correction
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.label && (
              <p className="text-sm text-red-400 mt-1">
                {errors.label.message}
              </p>
            )}
          </div>

          {/* Champ pour ajouter ou retirer du cashback */}
          <div className="flex flex-col">
            <Label
              htmlFor="cashbackToEarn"
              className={`mb-2 ${
                isCorrection
                  ? "text-orange-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {isCorrection ? "Cashback à retirer" : "Cashback à ajouter"} (€)
            </Label>
            <Input
              type="number"
              min={1}
              id={isCorrection ? "cashbackToSpent" : "cashbackToEarn"}
              {...register(
                isCorrection ? "cashbackToSpent" : "cashbackToEarn",
                {
                  valueAsNumber: true,
                }
              )}
              className={`bg-gray-100 dark:bg-gray-700 ${
                isCorrection ? "text-orange-400" : "border-teal-400"
              }`}
            />
            {errors.cashbackToEarn && !isCorrection && (
              <p className="text-sm text-red-400 mt-1">
                {errors.cashbackToEarn.message}
              </p>
            )}
            {errors.cashbackToSpent && isCorrection && (
              <p className="text-sm text-red-400 mt-1">
                {errors.cashbackToSpent.message}
              </p>
            )}
          </div>

          {/* Bouton Soumettre */}
          <Button
            type="submit"
            className="w-full p-3 rounded-lg bg-teal-200 text-gray-800 font-medium hover:bg-teal-300 transition dark:bg-teal-700 dark:hover:bg-teal-600 dark:text-gray-100"
          >
            {isCorrection ? "Appliquer la Correction" : "Attribuer le Cashback"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ManageCashback;
