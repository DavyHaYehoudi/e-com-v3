import { Badge } from "@/components/ui/badge";

interface StatYearBadgeProps {
  year: number;
}
const StatYearBadge: React.FC<StatYearBadgeProps> = ({ year }) => {
  return (
    <Badge
      className="bg-red-900 text-white text-xs font-bold px-2 py-1 rounded-full"
      variant="outline"
    >
      {year}
    </Badge>
  );
};

export default StatYearBadge;
