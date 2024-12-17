import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteAlertProps {
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void; // Callback exécuté lorsque l'utilisateur confirme
  onCancel?: () => void; // (Optionnel) Callback exécuté lorsque l'utilisateur annule
  itemNameToDelete?: string; // (Optionnel) Nom de l'élément à supprimer, pour afficher un message clair
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  isDeleteOpen,
  setIsDeleteOpen,
  onConfirm,
  onCancel,
  itemNameToDelete,
}) => {
  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Etes-vous sûr de vouloir supprimer ${
              itemNameToDelete || "cet élément"
            } ?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            La suppression est irréversible. Veuillez confirmer votre choix.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setIsDeleteOpen(false);
              if (onCancel) onCancel(); // Exécution du callback d'annulation s'il existe
            }}
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300 font-medium rounded-md px-4 py-2 transition duration-200"
            onClick={() => {
              onConfirm(); // Exécution du callback de confirmation
              setIsDeleteOpen(false); // Fermeture de la modale
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
