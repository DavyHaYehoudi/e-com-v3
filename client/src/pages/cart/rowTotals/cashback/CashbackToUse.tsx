import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { CheckCircleIcon, BadgeEuro } from "lucide-react";
import { cashbackToUseSchema } from "./cashbackToUseSchema";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setCashBackToSpend } from "@/redux/slice/priceAdjustmentsSlice";
import { RootState } from "@/redux/store/store";
import { formatPrice } from "@/utils/pricesFormat";

type FormValues = {
  cashbackAmount: number;
};

const CashbackToUse = () => {
  const cashbackCustomer = useSelector(
    (state: RootState) => state.cashback.cashbackTotal
  );
  const cashbackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(cashbackToUseSchema(cashbackCustomer)),
    defaultValues: {
      cashbackAmount: 0,
    },
  });
  const dispatch = useDispatch();

  const cashbackAmount = watch("cashbackAmount");
  const isButtonDisabled = cashbackAmount <= 0;

  const handleCashbackChange = (value: string) => {
    const numericValue = Number(value);
    // Réinitialiser isSubmitted si la valeur change
    setIsSubmitted(false);
    if (numericValue > cashbackCustomer) {
      setValue("cashbackAmount", cashbackCustomer);
    } else {
      setValue("cashbackAmount", numericValue);
    }
  };

  const isValidAmount =
    cashbackAmount > 0 && cashbackAmount <= cashbackCustomer;

  const handleSubmit = () => {
    if (isValidAmount) {
      dispatch(setCashBackToSpend(cashbackAmount));
      setIsSubmitted(true); // Met à jour isSubmitted lorsque le montant est valide
    }
  };
  // Reset le formulaire lorsque un produit est supprimé du panier
  useEffect(() => {
    if (!cashbackToSpend) {
      reset({ cashbackAmount: 0 });
    }
  }, [cashbackToSpend, reset]);
  return (
    <TableCell colSpan={5}>
      <Controller
        name="cashbackAmount"
        control={control}
        render={({ field }) => (
          <>
            <Label>
              Montant du cashback disponible :{" "}
              <span className="bg-blue-500 text-[var(--whiteSmoke)] px-1 py-1 rounded font-bold ">
                {formatPrice(cashbackCustomer)}
              </span>{" "}
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type="number"
                placeholder="Montant du cashback"
                {...field}
                {...register("cashbackAmount")}
                value={field.value || ""}
                onChange={(e) => handleCashbackChange(e.target.value)}
                className="w-full"
              />
              {errors.cashbackAmount && (
                <span className="text-red-500">
                  {errors.cashbackAmount.message}
                </span>
              )}

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                <BadgeEuro className="size-4" />
                <span className="ml-1">Utiliser</span>
              </Button>

              {/* Affichage du montant et cercle de validation seulement après soumission */}
              {isSubmitted && isValidAmount && cashbackToSpend && (
                <>
                  <CheckCircleIcon className="text-green-500" />
                  <span className="text-green-500 whitespace-nowrap">
                    {formatPrice(cashbackAmount)}
                  </span>
                </>
              )}
            </div>
          </>
        )}
      />
    </TableCell>
  );
};

export default CashbackToUse;
