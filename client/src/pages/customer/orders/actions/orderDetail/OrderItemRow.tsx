import { sumPriceArticle } from "@/utils/pricesFormat";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { TableCell, TableRow } from "@/components/ui/table";
import { OrderItem } from "@/types/order/OrderTypes";

interface OrderItemRowProps {
  item: OrderItem;
}
const OrderItemRow: React.FC<OrderItemRowProps> = ({ item }) => {
  return (
    <TableRow>
      <TableCell>
        <ProductImageItem
          productId={item.productId}
          name={item.name}
          path={item.heroImage}
        />
      </TableCell>
      <TableCell>
        {item.name} - {item.variant}{" "}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {sumPriceArticle(
          item.articleNumber,
          item.priceBeforePromotionOnProduct
        )}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {item.promotionPercentage && (
          <PromotionBadge promotionPercentage={item.promotionPercentage} />
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderItemRow;
