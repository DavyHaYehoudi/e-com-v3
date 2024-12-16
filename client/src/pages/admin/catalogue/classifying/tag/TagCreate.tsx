import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// Définition des types pour le formulaire
interface TagFormInputs {
  label: string;
}
// Types pour les props
interface TagCreateProps {
  onAddTag: (newTag: string) => void;
}

const TagCreate: React.FC<TagCreateProps> = ({ onAddTag }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TagFormInputs>();

  const onSubmit: SubmitHandler<TagFormInputs> = async (data) => {
    try {
      onAddTag(data.label.trim()); // Notifie le parent avec le nouveau tag
      reset(); // Réinitialise le formulaire
    } catch (error) {
      console.error("Erreur lors de la création du tag :", error);
      toast.error("Impossible d'ajouter le tag.");
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Creer un Tag</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Champ nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du Tag
            </label>
            <Input
              {...register("label", { required: "Le nom est requis" })}
              type="text"
              placeholder="Nom du tag"
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
              Ajouter le Tag
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TagCreate;
