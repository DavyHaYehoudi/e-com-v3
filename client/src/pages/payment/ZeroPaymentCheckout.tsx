import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCreatePendingOrder from "./hooks/useCreatePendingOrder";
import { BadgeEuro, PercentIcon, GiftIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useState } from "react";
import { Loader } from "lucide-react";
import { formatPrice } from "@/utils/pricesFormat";
import { useStripe, useElements } from "@stripe/react-stripe-js";
type CardProps = React.ComponentProps<typeof Card>;

const ZeroPaymentCheckout = ({ className, ...props }: CardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const amountDeducted = useSelector(
    (state: RootState) => state.priceAdjustments.promocode.amountDeducted
  );
  const amountGiftcardsToUse = useSelector(
    (state: RootState) => state.priceAdjustments.amountTotalGiftcardsToUse
  );
  const amountCashbackToUse =
    useSelector((state: RootState) => state.priceAdjustments.cashBackToSpend) ||
    0;
  const adjustments = [
    {
      title: "Code promo",
      description: `${
        amountDeducted > 0 ? formatPrice(amountDeducted) : "Sans"
      }`,
      icon: <PercentIcon className="size-4" />,
    },
    {
      title: "Cartes cadeaux",
      description: `${
        amountGiftcardsToUse
          ? `jusqu'à ` + formatPrice(amountGiftcardsToUse)
          : "Sans"
      }`,
      icon: <GiftIcon className="size-4" />,
    },
    {
      title: "Cashback",
      description: `${
        amountCashbackToUse ? formatPrice(amountCashbackToUse) : "Sans"
      }`,
      icon: <BadgeEuro className="size-4" />,
    },
  ];
  const { getOrderInformation } = useCreatePendingOrder();

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      if (!stripe || !elements) {
        return;
      }
      const orderInfo = await getOrderInformation();

      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${
            import.meta.env.VITE_CLIENT_URL
          }/payment/success?orderNumber=${
            orderInfo?.order.orderNumber
          }}&firstName=${orderInfo?.firstName}`,
        },
      });
    } catch (error) {
      console.log("erreur dans ZeroPaymentCheckout :", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center">
      <Card className={cn("w-[380px] bg-dark", className)} {...props}>
        <CardHeader>
          <CardTitle className="tracking-wider text-center">
            Confirmation
          </CardTitle>
          <CardDescription>
            En utilisant les moyens ci-dessous, la commande est passée à{" "}
            {formatPrice(0)}{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {adjustments.map((adjustment, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="hidden sm:flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium  flex items-center gap-5">
                    <span>{adjustment.icon} </span>
                    <span>{adjustment.title}</span>
                    <span className="whitespace-nowrap">
                      {adjustment.description}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 dark:text-[var(--whiteSmoke)] font-bold"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-gray-500" size={24} />
            ) : (
              "Confirmer"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ZeroPaymentCheckout;
