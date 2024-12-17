import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalendarCustom from "@/components/shared/CalendarCustom";
import { addYears, format, startOfDay } from "date-fns";
import { PromocodeToAdd } from "./PromocodesPage";

// Schéma Zod pour validation
const promocodeSchema = z.object({
  code: z.string().min(1, "Le code ne doit pas être vide."),
  promocodePercentage: z
    .number()
    .min(1, "La valeur doit être supérieure à 0.")
    .max(100, "La valeur ne peut pas dépasser 100."),
  startDate: z
    .date()
    .refine(
      (date) => date >= startOfDay(new Date()),
      "La date de début ne peut pas être dans le passé."
    ),
  endDate: z
    .date()
    .refine((date) => date > new Date(), "La date de fin doit être du futur."),
});

type PromocodeFormValues = z.infer<typeof promocodeSchema>;

interface PromocodeCreateProps {
  onAddPromocode: (bodyData: PromocodeToAdd) => void;
}
const PromocodeCreate: React.FC<PromocodeCreateProps> = ({
  onAddPromocode,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PromocodeFormValues>({
    resolver: zodResolver(promocodeSchema),
    defaultValues: {
      code: "Noralya-20",
      promocodePercentage: 20,
      startDate: new Date(),
      endDate: addYears(new Date(), 1),
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit: SubmitHandler<PromocodeFormValues> = (data) => {
    const bodyData = {
      code: data.code,
      promocodePercentage: data.promocodePercentage,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
    };
    onAddPromocode(bodyData);
  };

  return (
    <div>
      <div className="max-w-lg mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Creer un code promo
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Code du code promo */}
          <div className="flex flex-col">
            <Label
              htmlFor="code"
              className="mb-2 text-gray-700 dark:text-gray-300"
            >
              Code
            </Label>
            <Input
              type="text"
              id="code"
              {...register("code")}
              className="bg-gray-100 dark:bg-gray-700"
            />
            {errors.code && (
              <p className="text-sm text-red-400 mt-1">{errors.code.message}</p>
            )}
          </div>

          {/* Pourcentage du code promo */}
          <div className="flex flex-col">
            <Label
              htmlFor="promocodePercentage"
              className="mb-2 text-gray-700 dark:text-gray-300"
            >
              Pourcentage de réduction (%)
            </Label>
            <Input
              type="number"
              id="promocodePercentage"
              {...register("promocodePercentage", { valueAsNumber: true })}
              className="bg-gray-100 dark:bg-gray-700"
            />
            {errors.promocodePercentage && (
              <p className="text-sm text-red-400 mt-1">
                {errors.promocodePercentage.message}
              </p>
            )}
          </div>

          {/* Date de début */}
          <div className="flex flex-col">
            <Label
              htmlFor="startDate"
              className="mb-2 text-gray-700 dark:text-gray-300"
            >
              Date de début
            </Label>
            <CalendarCustom
              value={startDate}
              onChange={(date) => setValue("startDate", date)}
              disabled={false}
            />
            {errors.startDate && (
              <p className="text-sm text-red-400 mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>
          {/* Date de fin */}
          <div className="flex flex-col">
            <Label
              htmlFor="endDate"
              className="mb-2 text-gray-700 dark:text-gray-300"
            >
              Date de fin
            </Label>
            <CalendarCustom
              value={endDate}
              onChange={(date) => setValue("endDate", date)}
              disabled={false}
            />
            {errors.endDate && (
              <p className="text-sm text-red-400 mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>

          {/* Bouton Soumettre */}
          <Button
            type="submit"
            className="w-full p-3 rounded-lg bg-teal-200 text-gray-800 font-medium hover:bg-teal-300 transition dark:bg-teal-700 dark:hover:bg-teal-600 dark:text-gray-100"
          >
            Créer le code promo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PromocodeCreate;
