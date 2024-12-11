import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useClientSecret from "../../hooks/payment/useClientSecret";
import getStripe from "./get-stripejs";

const CheckoutSection = () => {
  const { clientSecret, amount } = useClientSecret();
  const appearance = {
    theme: "stripe" as const,
  };
  const options = {
    clientSecret, // Ajout de clientSecret dans les options
    appearance,
  };
  
  const stripePromise = getStripe();

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} />
      </Elements>
    )
  );
};

export default CheckoutSection;
