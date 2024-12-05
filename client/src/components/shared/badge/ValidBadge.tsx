import { Badge } from "@/components/ui/badge";

const ValidBadge = () => {
  return (
    <Badge
      className="text-xs text-center font-bold px-2 py-1 rounded-full bg-green-500 text-[var(--whiteSmoke)]"
      variant="outline"
    >
      valide
    </Badge>
  );
};

export default ValidBadge;
