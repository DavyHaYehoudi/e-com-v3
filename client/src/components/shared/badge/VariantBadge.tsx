import { Badge } from "@/components/ui/badge";

interface VariantBadgeProps {
  productVariant: string;
}
const VariantBadge: React.FC<VariantBadgeProps> = ({ productVariant }) => {
  return <Badge className="text-xs font-bold px-2 py-1 rounded-full" variant="outline">{productVariant}</Badge>;
};

export default VariantBadge;
