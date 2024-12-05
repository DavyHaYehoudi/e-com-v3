import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HeartIcon } from "lucide-react";
import React from "react";
import WishlistTable from "./WishlistTable";
import { ScrollArea } from "@/components/ui/scroll-area";

const WishlistModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span title="Mes favoris">
          <HeartIcon className="w-6 h-6 cursor-pointer" />
        </span>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1200px] sm:w-[90%] md:w-[80%] lg:w-[1200px] bg-[var(--dark-mode-black)] text-[var(--whiteSmoke)]">
        <DialogHeader>
          <DialogTitle className="uppercase">mes favoris</DialogTitle>
          <DialogDescription className="overflow-x-auto" asChild>
            <ScrollArea className="h-[600px]">
              <WishlistTable />
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistModal;
