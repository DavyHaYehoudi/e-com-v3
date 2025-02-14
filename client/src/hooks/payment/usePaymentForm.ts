import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import useCreatePendingOrder from "./useCreatePendingOrder";
import { useFetch } from "@/service/hooks/useFetch";

const usePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent && paymentIntent.status) {
        case "succeeded":
          setMessage("Payment réussi !");
          break;
        case "processing":
          setMessage("Votre payment est en cours.");
          break;
        case "requires_payment_method":
          setMessage("Votre payment n'a pas réussi, essayez de nouveau.");
          break;
        default:
          setMessage("Il y a un empêchement au payment.");
          break;
      }
    });
  }, [stripe]);

  //  On récupère le numéro de la commande créée en staging
  const { getOrderInformation } = useCreatePendingOrder();
  // En cas d'échec de payment, on modifie le statut de payment de la commande créée en staging
  const { triggerFetch } = useFetch("/payment/status", {
    method: "PATCH",
    requiredCredentials: true,
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const orderInfo = await getOrderInformation();
    const orderNumber = orderInfo?.order.orderNumber;
    const firstName = orderInfo?.firstName;

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${
          import.meta.env.VITE_CLIENT_URL
        }/payment/success?orderNumber=${orderNumber}&firstName=${firstName}`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "");
        const bodyData = { orderNumber, statusNumber: 3 };
        triggerFetch(bodyData);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
  };

  return {
    handleSubmit,
    paymentElementOptions,
    isLoading,
    stripe,
    elements,
    message,
  };
};

export default usePaymentForm;
