import { Badge } from "@/components/ui/badge";
import { formatPromotionDate } from "@/utils/productUtils";

const PromotionBadge: React.FC<{
  promotionPercentage: number;
  additionalClasses?: string;
  promotionEndDate?: Date | null;
}> = ({ promotionPercentage, additionalClasses, promotionEndDate }) => {
  return (
    <Badge
      className={`bg-yellow-400 text-black text-center text-xs font-bold px-2 py-1 rounded w-[100px] ${additionalClasses}`}
      variant="outline"
    >
      -{promotionPercentage}%{" "}
      {promotionEndDate && formatPromotionDate(promotionEndDate)}
    </Badge>
  );
};

export default PromotionBadge;
