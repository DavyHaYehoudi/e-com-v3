import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import DeleteAlert from "@/components/shared/DeleteAlert";
import GenericModal from "@/components/shared/GenericModal";
import { SelectedTag } from "./TagsPage";

interface TagActionsProps {
  tagId: string;
  label: string;
  isDeleteOpen: boolean;
  isEditOpen: boolean;
  handleDeleteTag: (tagId: string) => void;
  handleEditTag: (tagId: string, updatedLabel: string) => void;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTag: SelectedTag;
  setSelectedTag: React.Dispatch<React.SetStateAction<SelectedTag>>;
}
const TagActions: React.FC<TagActionsProps> = ({
  tagId,
  label,
  handleDeleteTag,
  isDeleteOpen,
  isEditOpen,
  setIsDeleteOpen,
  setIsEditOpen,
  handleEditTag,
  selectedTag,
  setSelectedTag,
}) => {
  return (
    <>
      <DeleteAlert
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        itemNameToDelete={selectedTag.label}
        onConfirm={() => {
          if (selectedTag) {
            handleDeleteTag(selectedTag.tagId);
          }
          setIsDeleteOpen(false);
          setSelectedTag((prev) => ({ ...prev, tagId: "", label: "" }));
        }}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedTag((prev) => ({ ...prev, tagId: "", label: "" }));
        }}
      />
      <GenericModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Modifier le tag"
        fields={[
          { id: "label", label: "Nom du tag", value: selectedTag.label },
        ]}
        onSubmit={(data) => {
          const updatedLabel = data["label"]; // Récupère la valeur modifiée
          handleEditTag(tagId, updatedLabel); // Appel de la fonction avec tagId et updatedLabel
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
                setIsEditOpen(true);
                setSelectedTag((prev) => ({ ...prev, tagId, label }));
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100 hover:text-yellow-500 "
            >
              <SquarePen className="h-4 w-4" />{" "}
              <span className="ml-2">Modifier</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
                setSelectedTag((prev) => ({ ...prev, tagId, label }));
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

export default TagActions;
