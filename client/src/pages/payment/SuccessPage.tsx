import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, ArrowRightCircle, Home, Loader } from "lucide-react";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch } from "react-redux";
import { resetPriceAdjustments } from "@/redux/slice/priceAdjustmentsSlice";
import { clearCart } from "@/redux/slice/cartSlice";
import useCashback from "@/hooks/useCashback";
import { useSearchParams } from "react-router-dom";
const PaymentSuccess = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [orderPendingCreated, setOrderPendingCreated] = useState(false);
  const dispatch = useDispatch();

  const { triggerFetch } = useFetch("/payment/status", {
    method: "PATCH",
    requiredCredentials: true,
  });

  const { triggerFetch: triggerClearCart } = useFetch("/customer", {
    method: "PATCH",
    requiredCredentials: true,
  });

  const { getCashbackOneCustomer } = useCashback();
  const [searchParams] = useSearchParams();

  const orderNumber = searchParams.get("orderNumber");
  const firstName = searchParams.get("firstName");
  useEffect(() => {
    if (orderNumber) {
      const bodyData = { orderNumber, statusNumber: 1 };
      triggerFetch(bodyData)
        .then(() => {
          setOrderPendingCreated(true);
          dispatch(resetPriceAdjustments());
          dispatch(clearCart());
          getCashbackOneCustomer();
          triggerClearCart({ cartProducts: [], cartGiftcards: [] });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orderNumber]);

  if (!orderPendingCreated) {
    return (
      <div className="flex justify-center my-20 text-center">
        <div>
          <p>Création de votre commande en cours...</p>
          <p className="flex justify-center my-5">
            <Loader className="animate-spin text-gray-500" size={96} />
          </p>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader className="flex flex-col items-center">
          <CheckCircle className="text-green-500" size={48} />
          <DialogTitle className="text-green-600 text-xl font-bold mt-2">
            Paiement Réussi 😃
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            Merci pour votre achat {firstName ? firstName : ""} ! Votre commande
            a été traitée avec succès.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          {orderNumber && (
            <p className="text-lg">
              Votre numéro de commande : <strong>{orderNumber}</strong>
            </p>
          )}
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              // Rediriger vers les détails de la commande
              window.location.href = `/customer/tableau-de-bord/commandes/liste`;
            }}
          >
            <ArrowRightCircle className="text-blue-600" />
            Voir la commande
          </Button>
          <Button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
            onClick={() => {
              // Rediriger vers la page d'accueil
              window.location.href = "/";
            }}
          >
            <Home className="text-white" />
            Retourner à l&apos;accueil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccess;
