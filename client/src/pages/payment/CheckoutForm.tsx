import { PaymentElement } from "@stripe/react-stripe-js";
import usePaymentForm from "../../hooks/payment/usePaymentForm";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/pricesFormat";
import { useState } from "react";

interface CheckoutProps {
  amount: number;
}
const CheckoutForm: React.FC<CheckoutProps> = ({ amount }) => {
  const {
    handleSubmit,
    paymentElementOptions,
    isLoading,
    stripe,
    elements,
    message,
  } = usePaymentForm();

  const [isPaymentValid, setIsPaymentValid] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaymentElementChange = (event: any) => {
    setIsPaymentValid(event.complete); // `event.complete` est true si tous les champs sont valides
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
          onChange={handlePaymentElementChange}
        />

        <div className="text-center m-5">
          {isLoading ? (
            <div className="flex justify-center items-center gap-5">
              <Loader className="animate-spin text-gray-500" size={48} />
              <p>Veuillez patienter, paiement en cours...</p>
            </div>
          ) : (
            <Button
              className="bg-green-500 hover:bg-green-600 dark:text-[var(--whiteSmoke)] font-bold"
              disabled={isLoading || !stripe || !elements || !isPaymentValid}
              type="submit"
            >
              Payer : {formatPrice(amount)}
            </Button>
          )}
        </div>
        {message && <div className="text-red-700">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
