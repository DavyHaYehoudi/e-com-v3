import React from "react";
import { Trash } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface TrashIconProps {
  onClick: () => void;
}

const TrashIcon: React.FC<TrashIconProps> = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Trash
            className="cursor-pointer text-gray-600 hover:text-red-600 transition-colors duration-300 fill-none hover:fill-current"
            onClick={onClick}
            size={24}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Supprimer</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TrashIcon;
{
  /* <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider> */
}
