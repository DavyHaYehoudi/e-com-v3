import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { formatPrice } from "@/utils/pricesFormat";
import { Link } from "react-router-dom";
import { calculateTotalCashbackCartToEarn } from "@/utils/cartCalculs";
import { useOrderAmount } from "@/hooks/useOrderAmount";
import { CartProductsToBuyFrontType } from "@/types/CartTypes";

interface ProceedToPaymentProps {
  cartProducts: CartProductsToBuyFrontType[];
}

const ProceedToPayment: React.FC<ProceedToPaymentProps> = ({
  cartProducts,
}) => {
  const giftcardIds = useSelector(
    (state: RootState) => state.priceAdjustments.giftcards
  );
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promocode
  );
  const cashBackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );

  const { getOrderAmount, orderAmount } = useOrderAmount();
  useEffect(() => {
    getOrderAmount();
  }, [giftcardIds, codePromo, cashBackToSpend, getOrderAmount]);

  return (
    <div className="wrapper flex flex-wrap items-center justify-center xl:justify-between my-5 gap-5">
      <div className="text-blue-500 italic m-1 text-center">
        Total du cashback capitalisé pour vos prochains achats :{" "}
        <span className="font-extrabold whitespace-nowrap">
          {formatPrice(calculateTotalCashbackCartToEarn(cartProducts))}
        </span>
      </div>
      <Link to="/payment/checkout">
        <Button className="bg-green-500 hover:bg-green-600 dark:text-[var(--whiteSmoke)]">
          <span>
            Procéder au payment {formatPrice(Math.max(orderAmount, 0))}
          </span>
          {orderAmount < 0 && (
            <span className="ml-2">({formatPrice(orderAmount)}) </span>
          )}
        </Button>
      </Link>
    </div>
  );
};

export default ProceedToPayment;
