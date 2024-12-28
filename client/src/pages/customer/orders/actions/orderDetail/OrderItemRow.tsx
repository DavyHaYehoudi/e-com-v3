import { formatPrice, sumPriceArticle } from "@/utils/pricesFormat";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { TableCell, TableRow } from "@/components/ui/table";
import { OrderItem } from "@/types/order/OrderTypes";
import { formatDate } from "@/utils/formatDate";

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
        {item.promotionPercentage ? (
          <PromotionBadge promotionPercentage={item.promotionPercentage} />
        ) : (
          ""
        )}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {item.returnNumber ? (
          <div>
            {item.returnNumber} article(s) <br />
            {item.returnAt && formatDate(item.returnAt)}{" "}
          </div>
        ) : (
          ""
        )}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {item.exchangeNumber ? (
          <div>
            {item.exchangeNumber} article(s)
            <br />
            {item.exchangeAt && formatDate(item.exchangeAt)}{" "}
          </div>
        ) : (
          ""
        )}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {item.refundAmount ? (
          <div>
            {item.refundAmount && formatPrice(item.refundAmount)}
            <br />
            {item.refundAt && formatDate(item.refundAt)}{" "}
          </div>
        ) : (
          ""
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderItemRow;
