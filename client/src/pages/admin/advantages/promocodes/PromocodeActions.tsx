import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";
import { SelectedPromocode } from "./PromocodesPage";

interface PromocodeActionsProps {
  promocodeId: string;
  code: string;
  isDeleteOpen: boolean;
  handleDeletePromocode: () => void;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPromocode: SelectedPromocode;
  setSelectedPromocode: React.Dispatch<React.SetStateAction<SelectedPromocode>>;
}
const PromocodeActions: React.FC<PromocodeActionsProps> = ({
  promocodeId,
  code,
  handleDeletePromocode,
  isDeleteOpen,
  setIsDeleteOpen,
  selectedPromocode,
  setSelectedPromocode,
}) => {
  return (
    <>
      <DeleteAlert
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        itemNameToDelete={selectedPromocode.code}
        onConfirm={() => {
          handleDeletePromocode();
          setIsDeleteOpen(false);
          setSelectedPromocode((prev) => ({
            ...prev,
            promocodeId: "",
            label: "",
          }));
        }}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedPromocode((prev) => ({
            ...prev,
            promocodeId: "",
            label: "",
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
            <button
              onClick={() => {
                setIsDeleteOpen(true);
                setSelectedPromocode((prev) => ({
                  ...prev,
                  promocodeId,
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

export default PromocodeActions;
