import { Badge } from "@/components/ui/badge";

interface PendingBadgeProps {
  label: string;
}
const PendingBadge: React.FC<PendingBadgeProps> = ({ label }) => {
  return (
    <Badge
      className="text-xs text-center font-bold px-2 py-1 rounded-full bg-yellow-500 text-[var(--whiteSmoke)]"
      variant="outline"
    >
      {label}
    </Badge>
  );
};

export default PendingBadge;
