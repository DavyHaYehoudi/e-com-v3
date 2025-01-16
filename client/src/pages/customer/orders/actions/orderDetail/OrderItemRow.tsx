import { formatPrice, sumPriceArticle } from "@/utils/pricesFormat";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { TableCell, TableRow } from "@/components/ui/table";
import { OrderItem } from "@/types/OrderTypes";
import { formatDate } from "@/utils/formatDate";
import ReturnBadge from "@/components/shared/badge/ReturnBadge";
import ExchangeBadge from "@/components/shared/badge/ExchangeBadge";
import RefundBadge from "@/components/shared/badge/RefundBadge";
import VariantBadge from "@/components/shared/badge/VariantBadge";

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
          width="100px"
          height="100px"
        />
      </TableCell>
      <TableCell className="min-w-[150px]">
        {item.name} <br /> <VariantBadge productVariant={item.variant} />{" "}
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
            <ReturnBadge />
            <br />
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
            <ExchangeBadge /> <br />
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
            <RefundBadge /> <br />
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
