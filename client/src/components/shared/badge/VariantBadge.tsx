import { Badge } from "@/components/ui/badge";

interface VariantBadgeProps {
  productVariant: string;
}
const VariantBadge: React.FC<VariantBadgeProps> = ({ productVariant }) => {
  return (
    <Badge
      className="bg-slate-500 text-white text-xs font-bold px-2 py-1 rounded-full text-center"
      variant="outline"
    >
      {productVariant}
    </Badge>
  );
};

export default VariantBadge;
