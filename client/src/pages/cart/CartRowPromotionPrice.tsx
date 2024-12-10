import { isProductOnSale } from "@/utils/productUtils";
import { calculateTotalDiscountByRow } from "@/utils/cartCalculs";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import { formatPrice } from "@/utils/pricesFormat";

interface CartRowPromotionPriceProps {
  quantity: number;
  price: number;
  promotionPercentage: number;
  promotionEndDate: Date | null;
}
const CartRowPromotionPrice: React.FC<CartRowPromotionPriceProps> = ({
  quantity,
  price,
  promotionPercentage,
  promotionEndDate,
}) => {
  return (
    <>
      {isProductOnSale(promotionPercentage, promotionEndDate) && (
        <>
          <PromotionBadge
            promotionPercentage={promotionPercentage}
            promotionEndDate={promotionEndDate}
          />{" "}
          <br />{" "}
          <span className="whitespace-nowrap text-green-500">
            -{" "}
            {formatPrice(
              calculateTotalDiscountByRow(quantity, price, promotionPercentage)
            )}
          </span>
        </>
      )}
    </>
  );
};

export default CartRowPromotionPrice;
