import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// Définition des types pour le formulaire
interface CollectionFormInputs {
  label: string;
}
// Types pour les props
interface CollectionCreateProps {
  onAddCollection: (newCollection: string) => void;
}

const CollectionCreate: React.FC<CollectionCreateProps> = ({
  onAddCollection,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CollectionFormInputs>();

  const onSubmit: SubmitHandler<CollectionFormInputs> = async (data) => {
    try {
      onAddCollection(data.label.trim()); // Notifie le parent avec la nouvelle collection
      reset(); // Réinitialise le formulaire
    } catch (error) {
      console.error("Erreur lors de la création de la collection :", error);
      toast.error("Impossible d'ajouter la collection.");
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Creer une collection
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Champ nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la collection{" "}
              <span className="italic">(il doit être unique)</span>
            </label>
            <Input
              {...register("label", { required: "Le nom est requis" })}
              type="text"
              placeholder="Nom de la collection"
              className="w-full"
            />
            {errors.label && (
              <p className="text-red-500 text-sm mt-1">
                {errors.label.message}
              </p>
            )}
          </div>

          {/* Bouton Soumettre */}
          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Ajouter la collection
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CollectionCreate;
