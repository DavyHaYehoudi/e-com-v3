import { Badge } from "@/components/ui/badge";

const NewBadge: React.FC<{
  additionalClasses?: string;
}> = ({ additionalClasses }) => {
  return (
    <Badge
      className={`bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full ${additionalClasses}`}
      variant="outline"
    >
      Nouveau
    </Badge>
  );
};

export default NewBadge;
