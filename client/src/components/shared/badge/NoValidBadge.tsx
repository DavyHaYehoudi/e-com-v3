import { Badge } from "@/components/ui/badge";

interface NoValidBadgeProps {
  label: string;
}
const NoValidBadge: React.FC<NoValidBadgeProps> = ({ label }) => {
  return (
    <Badge
      className="text-xs text-center font-bold px-2 py-1 rounded-full bg-rose-500 text-[var(--whiteSmoke)]"
      variant="outline"
    >
      {label}
    </Badge>
  );
};

export default NoValidBadge;
