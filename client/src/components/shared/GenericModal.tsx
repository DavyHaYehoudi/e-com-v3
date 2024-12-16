import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Field {
  id: string; // Identifiant du champ
  label: string; // Label du champ
  value: string; // Valeur initiale
  type?: string; // Type du champ (text, number, etc.)
}

interface GenericModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string; // Titre de la modale
  description?: string; // Description optionnelle
  fields: Field[]; // Liste des champs dynamiques
  onSubmit: (data: Record<string, string>) => void; // Callback à exécuter lors de la soumission
  actions?: React.ReactNode; // Boutons/actions supplémentaires
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  description,
  fields,
  onSubmit,
  actions,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.id]: field.value || "" }),
      {}
    )
  );

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    onSubmit(formData); // Appel du callback avec les données
    setIsOpen(false); // Ferme la modale après soumission
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.id} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.id}
                value={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="col-span-3"
                type={field.type || "text"}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
        <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button type="submit" onClick={handleSave}>
            Enregistrer
          </Button>
          {actions}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenericModal;
