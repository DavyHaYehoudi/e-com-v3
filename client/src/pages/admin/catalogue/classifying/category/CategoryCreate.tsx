import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// Définition des types pour le formulaire
interface CategoryFormInputs {
  label: string;
}
// Types pour les props
interface CategoryCreateProps {
  onAddCategory: (newCategory: string) => void;
}

const CategoryCreate: React.FC<CategoryCreateProps> = ({ onAddCategory }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormInputs>();

  const onSubmit: SubmitHandler<CategoryFormInputs> = async (data) => {
    try {
      onAddCategory(data.label.trim()); // Notifie le parent avec la nouvelle catégorie
      reset(); // Réinitialise le formulaire
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
      toast.error("Impossible d'ajouter la catégorie.");
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Creer une categorie
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Champ nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la catégorie{" "}
              <span className="italic">(il doit être unique)</span>
            </label>
            <Input
              {...register("label", { required: "Le nom est requis" })}
              type="text"
              placeholder="Nom de la catégorie"
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
              Ajouter la catégorie
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CategoryCreate;
