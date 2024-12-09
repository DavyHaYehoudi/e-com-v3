import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { formatPrice } from "@/utils/pricesFormat";
import { Link } from "react-router-dom";
import { calculateTotalCashbackCartToEarn } from "@/utils/cartCalculs";
import { useOrderAmount } from "@/hooks/useOrderAmount";
import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";

interface ProceedToPaymentProps {
  cartProducts: CartProductsToBuyFrontType[];
}

const ProceedToPayment: React.FC<ProceedToPaymentProps> = ({
  cartProducts,
}) => {
  const giftCardIds = useSelector(
    (state: RootState) => state.priceAdjustments.giftCards
  );
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promoCode
  );
  const shippingMethodId =
    useSelector((state: RootState) => state.priceAdjustments.shippingMethod) ||
    "";
  const cashBackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const { getOrderAmount, orderAmount, getAmountBeforeDiscount } =
    useOrderAmount();

  useEffect(() => {
    getOrderAmount();
  }, [
    giftCardIds,
    codePromo,
    shippingMethodId,
    cashBackToSpend,
    getOrderAmount,
  ]);

  useEffect(() => {
    getAmountBeforeDiscount();
  }, []);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="wrapper flex flex-wrap items-center justify-center xl:justify-between my-5 gap-5">
      <div className="bg-blue-500 text-[var(--whiteSmoke)] p-1 rounded m-1 text-center">
        Total du cashback capitalisé pour vos prochains achats :{" "}
        <span className="font-extrabold whitespace-nowrap">
          {formatPrice(calculateTotalCashbackCartToEarn(cartProducts))}
        </span>
      </div>
      <Link to="/payment/checkout">
        <Button className="bg-green-500 hover:bg-green-600 dark:text-[var(--whiteSmoke)]">
          {isAuthenticated ? (
            <>
              <span>
                Procéder au payment {formatPrice(Math.max(orderAmount, 0))}
              </span>
              {orderAmount < 0 && (
                <span className="ml-2">({formatPrice(orderAmount)}) </span>
              )}
            </>
          ) : (
            <span>Procéder au payment</span>
          )}
        </Button>
      </Link>
    </div>
  );
};

export default ProceedToPayment;
