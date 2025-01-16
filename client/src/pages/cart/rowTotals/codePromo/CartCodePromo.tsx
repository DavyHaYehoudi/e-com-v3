import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, PercentIcon } from "lucide-react";
import { promoCodeSchema } from "./promoCodeSchema";
import { Label } from "@/components/ui/label";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { calculateCodePromoDiscountOnCartTotal } from "@/utils/cartCalculs";
import { PromocodeVerifyType } from "@/types/PromocodeTypes";
import { setPromocode } from "@/redux/slice/priceAdjustmentsSlice";

const CartCodePromo = ({
  promocodePercentage,
}: {
  promocodePercentage: number;
}) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [validPromo, setValidPromo] = useState<boolean | null>(null);
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const promocode = useSelector(
    (state: RootState) => state.priceAdjustments.promocode.code
  );
  const { cartProducts, cartGiftcards } = cartCustomer;
  const dispatch = useDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ code: string }>({
    resolver: zodResolver(promoCodeSchema),
    mode: "onChange",
  });
  // Reset le formulaire lorsque un produit est supprimé du panier
  useEffect(() => {
    if (!promocode) {
      reset({ code: "" });
    }
  }, [promocode, reset]);

  const { triggerFetch } = useFetch<PromocodeVerifyType>(
    "/promocodes/verify-code",
    {
      method: "POST",
    }
  );
  // Gestion de la soumission du formulaire
  const onSubmit = async (data: { code: string }) => {
    const codePromo = await triggerFetch({ code: data.code });
    if (codePromo) {
      dispatch(
        setPromocode({
          code: codePromo.code,
          percentage: codePromo.promocodePercentage,
          amountDeducted: calculateCodePromoDiscountOnCartTotal(
            cartProducts,
            cartGiftcards,
            codePromo.promocodePercentage
          ),
        })
      );
      setApiError(null);
      setValidPromo(true); // Code valide  // On appelle la fonction onPromotion avec la valeur du code de réduction
    } else {
      dispatch(setPromocode({ code: "", percentage: 0, amountDeducted: 0 }));
      setApiError("Code de réduction invalide");
      setValidPromo(false); // Code non valide
    }
  };

  return (
    <TableCell colSpan={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Code de réduction</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="text"
            placeholder="ex: Bonjour-15"
            {...register("code")}
            className={errors.code ? "border-red-500" : ""}
          />
          <Button type="submit" disabled={!isValid}>
            <PercentIcon className="size-4" />{" "}
            <span className="ml-1">Valider</span>
          </Button>
          {/* Icône de validation */}
          {validPromo === true && promocode && (
            <>
              <CheckCircleIcon className="text-green-500" />
              <span className="text-green-500">{promocodePercentage}%</span>
            </>
          )}
          {validPromo === false && <XCircleIcon className="text-red-500" />}
        </div>
      </form>
      {/* Message d'erreur si code incorrect */}
      {apiError && <p className="text-red-500">{apiError}</p>}
    </TableCell>
  );
};

export default CartCodePromo;
