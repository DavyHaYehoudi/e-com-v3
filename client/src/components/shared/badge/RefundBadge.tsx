import { Badge } from "@/components/ui/badge";

const RefundBadge = () => {
  return (
    <Badge
      className="bg-rose-50 dark:bg-rose-900 text-xs font-bold px-2 py-1 rounded-full text-center"
      variant="outline"
    >
      Remboursement
    </Badge>
  );
};

export default RefundBadge;
