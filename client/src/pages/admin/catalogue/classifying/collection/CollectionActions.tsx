import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";
import GenericModal from "@/components/shared/dialog/GenericModal";
import { SelectedCollection } from "./CollectionsPage";

interface CollectionActionsProps {
  collectionId: string;
  label: string;
  isDeleteOpen: boolean;
  isEditOpen: boolean;
  handleDeleteCollection: () => void;
  handleEditCollection: (updatedLabel: string) => void;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCollection: SelectedCollection;
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<SelectedCollection>
  >;
}
const CollectionActions: React.FC<CollectionActionsProps> = ({
  collectionId,
  label,
  handleDeleteCollection,
  isDeleteOpen,
  isEditOpen,
  setIsDeleteOpen,
  setIsEditOpen,
  handleEditCollection,
  selectedCollection,
  setSelectedCollection,
}) => {
  return (
    <>
      <DeleteAlert
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        itemNameToDelete={selectedCollection.label}
        onConfirm={() => {
          handleDeleteCollection();
          setIsDeleteOpen(false);
          setSelectedCollection((prev) => ({
            ...prev,
            collectionId: "",
            label: "",
          }));
        }}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedCollection((prev) => ({
            ...prev,
            collectionId: "",
            label: "",
          }));
        }}
      />
      <GenericModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Modifier la categorie"
        fields={[
          {
            id: "label",
            label: "Nom de la catégorie",
            value: selectedCollection.label,
          },
        ]}
        onSubmit={(data) => {
          const updatedLabel = data["label"]; // Récupère la valeur modifiée
          handleEditCollection(updatedLabel); // Appel de la fonction avec collectionId et updatedLabel
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
                setSelectedCollection((prev) => ({
                  ...prev,
                  collectionId,
                  label,
                }));
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
                setSelectedCollection((prev) => ({
                  ...prev,
                  collectionId,
                  label,
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

export default CollectionActions;
