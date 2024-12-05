import { Badge } from "@/components/ui/badge";
import { formatPromotionDate } from "@/utils/productUtils";

const PromotionBadge: React.FC<{
  discountPercentage: number | null;
  additionalClasses?: string;
  discount_end_date?: string | null;
}> = ({ discountPercentage, additionalClasses, discount_end_date }) => {
  return (
    <Badge
      className={`bg-yellow-400 text-black text-center text-xs font-bold px-2 py-1 rounded w-[100px] ${additionalClasses}`}
      variant="outline"
    >
      -{discountPercentage}%{" "}
      {discount_end_date && formatPromotionDate(discount_end_date)}
    </Badge>
  );
};

export default PromotionBadge;
