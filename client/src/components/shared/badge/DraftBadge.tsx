import { Badge } from "@/components/ui/badge";

interface DraftBadgeProps {
  label: string;
}
const DraftBadge: React.FC<DraftBadgeProps> = ({ label }) => {
  return (
    <Badge
      className="text-xs text-center font-bold px-2 py-1 rounded-full bg-gray-500 text-[var(--whiteSmoke)] capitalize"
      variant="outline"
    >
      {label}
    </Badge>
  );
};

export default DraftBadge;
