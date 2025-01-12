import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Send,
  SquarePen,
  Trash2,
  Fullscreen,
} from "lucide-react";
import { Link } from "react-router-dom";

interface CardActionsProps {
  marketingId: string;
  handleSendMarketing: () => void;
  handleRemoveMarketing: () => void;
  handlePreviewMarketing: () => void;
}
const CardActions: React.FC<CardActionsProps> = ({
  marketingId,
  handleSendMarketing,
  handleRemoveMarketing,
  handlePreviewMarketing,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="absolute right-2 cursor-pointer">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handlePreviewMarketing}>
          <Fullscreen />
          Prévisualiser
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SquarePen />
          <Link to={`/admin/tableau-de-bord/marketing/modifier/${marketingId}`}>
            Modifier l'événement
          </Link>{" "}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={handleRemoveMarketing}
        >
          <Trash2 />
          Supprimer l'événement
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSendMarketing}>
          <Send />
          Diffuser la campagne
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardActions;
