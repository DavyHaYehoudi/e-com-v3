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
import {
  setAmountTotalGiftcardsToUse,
  setGiftCard,
} from "@/redux/slice/priceAdjustmentsSlice";
import {
  GiftcardCheckType,
  GiftcardToUseFrontType,
} from "@/types/GiftcardTypes";
import { useState } from "react";
import ModalToChooseAmount from "./ModalToChooseAmount";
import { formatPrice } from "@/utils/pricesFormat";

const GiftcardToUse = ({
  giftcardsToUse,
}: {
  giftcardsToUse: GiftcardToUseFrontType[];
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGiftcardChecked, setIsGiftcardChecked] = useState(true);
  const [giftcardCheckIn, setGiftcardCheckIn] = useState<GiftcardCheckType>({
    _id: "",
    code: "",
    balance: 0,
  });
  const dispatch = useDispatch();
  const { triggerFetch } = useFetch<GiftcardCheckType>("/giftcards/check-in", {
    method: "POST",
  });
  const onSubmit = async (data: { code: string }) => {
    const giftcardDetails = await triggerFetch({ code: data.code });
    if (giftcardDetails) {
      setIsModalOpen(true);
      setGiftcardCheckIn(giftcardDetails);
      setIsGiftcardChecked(true);
    } else {
      return setIsGiftcardChecked(false);
    }
    reset();
  };

  const removeGiftCard = (
    code: string,
    _id: string,
    amountToDeduct: number
  ) => {
    dispatch(setGiftCard({ _id, type: "remove", code, balance: 0 }));
    dispatch(setAmountTotalGiftcardsToUse(-amountToDeduct));
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <TableCell colSpan={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Code carte cadeau</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="text"
            placeholder="ex: Uj49OpqQ123BBa"
            {...register("code")}
            className={errors.code ? "border-red-500" : ""}
          />
          <Button type="submit" disabled={!isValid}>
            <GiftIcon className="size-4" />{" "}
            <span className="ml-1">Ajouter</span>
          </Button>
        </div>
      </form>
      {!isGiftcardChecked && (
        <p className="text-red-500">Code de la carte cadeau invalide</p>
      )}
      {errors.code && <p className="text-red-500">{errors.code.message}</p>}

      <div className="mt-4 space-y-2">
        {giftcardsToUse.map((giftcard, index) => (
          <div key={index} className="flex items-center space-x-2">
            <p className="text-sm">{giftcard.code}</p>
            {giftcard.balance ? (
              <>
                <CheckCircle className="text-green-500 w-5 h-5" />
                <p className="text-green-500">
                  Utilisation de :{" "}
                  {giftcard.amountToUse && formatPrice(giftcard.amountToUse)}{" "}
                  sur un solde de {formatPrice(giftcard.balance)}
                </p>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 w-5 h-5" />
                <p className="text-red-500">"Carte cadeau non valide" </p>
              </>
            )}
            <TrashIcon
              onClick={() =>
                removeGiftCard(
                  giftcard.code,
                  giftcard._id,
                  giftcard?.amountToUse || 0
                )
              }
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <ModalToChooseAmount
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          giftcardCheckIn={giftcardCheckIn}
        />
      )}
    </TableCell>
  );
};

export default GiftcardToUse;
