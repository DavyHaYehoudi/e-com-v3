import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  setAmountTotalGiftcardsToUse,
  setGiftCard,
} from "@/redux/slice/priceAdjustmentsSlice";
import { GiftcardCheckType } from "@/types/giftcard/GiftcardTypes";
import { formatPrice } from "@/utils/pricesFormat";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface ModalToChooseAmountProps {
  isModalOpen: boolean;
  handleCloseModal: () => void; // Fonction pour fermer la modale
  giftcardCheckIn: GiftcardCheckType; // Données de la carte cadeau à utiliser
}
const ModalToChooseAmount: React.FC<ModalToChooseAmountProps> = ({
  isModalOpen,
  handleCloseModal,
  giftcardCheckIn,
}) => {
  const [amountValue, setAmountValue] = useState(0);
  const [errors, setErrors] = useState<{
    amount: string | null;
  }>({
    amount: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (giftcardCheckIn.balance) {
      setAmountValue(giftcardCheckIn.balance);
    }
  }, [giftcardCheckIn]);

  useEffect(() => {
    if (!isModalOpen) {
      setAmountValue(giftcardCheckIn.balance || 0);
    }
  }, [isModalOpen, giftcardCheckIn]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value);
    if (newAmount <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Le montant doit être supérieur à 0.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, amount: null }));
      setAmountValue(newAmount);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (giftcardCheckIn.balance && amountValue > giftcardCheckIn.balance)
      return; // Validation supplémentaire
    dispatch(
      setGiftCard({
        _id: giftcardCheckIn._id,
        type: "add",
        code: giftcardCheckIn.code,
        balance: giftcardCheckIn.balance,
        amountToUse: amountValue,
      })
    );
    dispatch(setAmountTotalGiftcardsToUse(amountValue));
    handleCloseModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Utiliser la carte cadeau</DialogTitle>
          <DialogDescription>
            Montant disponible :{" "}
            {giftcardCheckIn.balance && formatPrice(giftcardCheckIn.balance)}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Montant
              </Label>
              <Input
                id="amount"
                type="number"
                value={amountValue}
                min={1}
                className="col-span-3"
                onChange={handleAmountChange}
              />
            </div>
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
            {giftcardCheckIn.balance &&
              amountValue > giftcardCheckIn.balance && (
                <p className="text-red-500">
                  Le montant ne peut pas dépasser{" "}
                  {formatPrice(giftcardCheckIn.balance)}.
                </p>
              )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annuler
            </Button>
            <Button type="submit">Appliquer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalToChooseAmount;
