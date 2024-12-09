import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAmountTotalGiftcardsToUse } from "@/redux/slice/priceAdjustmentsSlice";
import { GiftcardToUseFrontType } from "@/types/giftcard/GiftcardTypes";

export const useGiftCards = () => {
  const [giftCardsToUse, setGiftCardsToUse] = useState<GiftcardToUseFrontType[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const amount = giftCardsToUse.reduce(
      (acc, giftCard) => acc + (giftCard.balance || 0),
      0
    );
    dispatch(setAmountTotalGiftcardsToUse(amount));
  }, [giftCardsToUse, dispatch]);

  const handleGiftcardToUse = (
    code: string,
    action: "add" | "remove",
    balance?: number,
    _id?: string,
    amountToUse: number = balance || 0
  ) => {
    if (action === "add") {
      setGiftCardsToUse((prev) => {
        if (prev.some((giftCard) => giftCard.code === code)) {
          return prev;
        }
        return [...prev, { code, balance, _id ,amountToUse}];
      });
    } else if (action === "remove") {
      setGiftCardsToUse((prev) =>
        prev.filter((giftCard) => giftCard.code !== code)
      );
    }
  };

  return { giftCardsToUse, handleGiftcardToUse };
};
