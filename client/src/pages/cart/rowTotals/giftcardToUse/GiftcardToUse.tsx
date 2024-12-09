import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, XCircle } from "lucide-react";
import { giftCardToUseSchema } from "./giftcardToUseSchema";
import { GiftIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import TrashIcon from "@/components/shared/TrashIcon";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch } from "react-redux";
import { setGiftCard } from "@/redux/slice/priceAdjustmentsSlice";
import { GiftcardCheckType, GiftcardToUseFrontType } from "@/types/giftcard/GiftcardTypes";

const GiftcardToUse = ({
  giftCardsToUse,
  onGiftcardToUse,
}: {
  giftCardsToUse: GiftcardToUseFrontType[];
  onGiftcardToUse: (
    code: string,
    action: "add" | "remove",
    balance?: number,
    _id?: string
  ) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<{ code: string }>({
    resolver: zodResolver(giftCardToUseSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const { triggerFetch } = useFetch<GiftcardCheckType>("/giftcards/check-in", {
    method: "POST",
  });
  const onSubmit = async (data: { code: string }) => {
    const giftcardDetails = await triggerFetch({ code: data.code });
    onGiftcardToUse(
      data.code,
      "add",
      giftcardDetails?.balance,
      giftcardDetails?._id
    );
    if (giftcardDetails) {
      dispatch(setGiftCard({ id: giftcardDetails._id, type: "add" }));
    }
    reset();
  };

  const removeGiftCard = (code: string, id?: string) => {
    onGiftcardToUse(code, "remove");
    dispatch(setGiftCard({ id, type: "remove" }));
  };

  return (
    <TableCell colSpan={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Code carte cadeau</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="text"
            placeholder="Code carte cadeau"
            {...register("code")}
            className={errors.code ? "border-red-500" : ""}
          />
          <Button type="submit" disabled={!isValid}>
            <GiftIcon className="size-4" />{" "}
            <span className="ml-1">Ajouter</span>
          </Button>
        </div>
      </form>

      {errors.code && <p className="text-red-500">{errors.code.message}</p>}

      <div className="mt-4 space-y-2">
        {giftCardsToUse.map((giftcard, index) => (
          <div key={index} className="flex items-center space-x-2">
            <p className="text-sm">{giftcard.code}</p>
            {giftcard.balance ? (
              <>
                <CheckCircle className="text-green-500 w-5 h-5" />
                <p className="text-green-500">Solde: {giftcard.balance}€</p>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 w-5 h-5" />
                <p className="text-red-500">"Carte cadeau non valide" </p>
              </>
            )}
            <TrashIcon
              onClick={() => removeGiftCard(giftcard.code, giftcard._id)}
            />
          </div>
        ))}
      </div>
    </TableCell>
  );
};

export default GiftcardToUse;
