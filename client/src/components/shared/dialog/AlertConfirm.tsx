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

interface AlertConfirmProps {
  isConfirmOpen: boolean;
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
}
const AlertConfirm: React.FC<AlertConfirmProps> = ({
  isConfirmOpen,
  setIsConfirmOpen,
  onConfirm,
  onCancel,
  title,
}) => {
  return (
    <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irreversible. Veuillez confirmer votre choix.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setIsConfirmOpen(false);
              if (onCancel) onCancel();
            }}
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-300 font-medium rounded-md px-4 py-2 transition duration-200"
            onClick={() => {
              onConfirm(); // Exécution du callback de confirmation
              setIsConfirmOpen(false); // Fermeture de la modale
            }}
          >
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AlertConfirm;
