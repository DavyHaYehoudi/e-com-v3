import { Badge } from "@/components/ui/badge";

interface ValidBadgeProps {
  label: string;
}
const ValidBadge: React.FC<ValidBadgeProps> = ({ label }) => {
  return (
    <Badge
      className="text-xs text-center font-bold px-2 py-1 rounded-full bg-green-500 text-[var(--whiteSmoke)]"
      variant="outline"
    >
      {label}
    </Badge>
  );
};

export default ValidBadge;
