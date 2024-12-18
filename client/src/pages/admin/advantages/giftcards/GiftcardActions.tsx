import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FileStack, MoreHorizontal, Trash2 } from "lucide-react";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";
import { SelectedGiftcard } from "./GiftcardsPage";
import { Link } from "react-router-dom";

interface GiftcardActionsProps {
  giftcardId: string;
  code: string;
  isDeleteOpen: boolean;
  handleDeleteGiftcard: () => void;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGiftcard: SelectedGiftcard;
  setSelectedGiftcard: React.Dispatch<React.SetStateAction<SelectedGiftcard>>;
}
const GiftcardActions: React.FC<GiftcardActionsProps> = ({
  giftcardId,
  code,
  handleDeleteGiftcard,
  isDeleteOpen,
  setIsDeleteOpen,
  selectedGiftcard,
  setSelectedGiftcard,
}) => {
  return (
    <>
      <DeleteAlert
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        itemNameToDelete={`la carte cadeau № ${selectedGiftcard.code}`}
        onConfirm={() => {
          handleDeleteGiftcard();
          setIsDeleteOpen(false);
          setSelectedGiftcard((prev) => ({
            ...prev,
            giftcardId: "",
            code: "",
          }));
        }}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedGiftcard((prev) => ({
            ...prev,
            giftcardId: "",
            code: "",
          }));
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <Link
              to={`/admin/tableau-de-bord/avantages/cartes-cadeaux/${giftcardId}`}
              className="flex items-center gap-2 ml-2"
            >
              <FileStack className="h-4 w-4" />
              <span>Historique</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
                setSelectedGiftcard((prev) => ({
                  ...prev,
                  giftcardId,
                  code,
                }));
              }}
              className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <Trash2 className="h-4 w-4" />{" "}
              <span className="ml-2">Supprimer</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default GiftcardActions;
