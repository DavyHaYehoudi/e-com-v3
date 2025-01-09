import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/pricesFormat";

const CashbackBadge: React.FC<{
  cashbackAmount: number;
  additionalClasses?: string;
}> = ({ cashbackAmount, additionalClasses }) => {
  return (
    <Badge
      className={` bg-blue-500 text-white text-xs font-bold px-4 text-center rounded-full ${additionalClasses}`}
      variant="outline"
    >
      Cashback
      <br /> +{formatPrice(cashbackAmount)}
    </Badge>
  );
};

export default CashbackBadge;
