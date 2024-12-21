import { Button } from "@/components/ui/button";
import React from "react";
import { variantsToAddType } from "../CreateProduct";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUploader from "./ImageUploader";

interface VariantsProps {
  variantsAvailable: boolean;
  variantsToAdd: variantsToAddType[];
  removeVariant: (combination: string) => void;
  addVariant: (variant: variantsToAddType) => void;
  setVariantsToAdd: React.Dispatch<React.SetStateAction<variantsToAddType>>;
}
const VariantsToAdd: React.FC<VariantsProps> = ({
  variantsAvailable,
  variantsToAdd,
  removeVariant,
  addVariant,
}) => {

  return (
    variantsAvailable && (
      <div className="my-20 border rounded-md p-4">
        <h3 className=" mb-2">Variantes</h3>
        {variantsToAdd.map((variant, index) => (
          <div key={index} className="mb-4 border p-4">
            <div>
              <Label className="text-sm font-medium mb-2">
                Combinaison : 
              </Label>
              <Input 
              type="text"
              placeholder="Combinaison, par exemple GoldField/XS"
              value={variant.combination}
              />
             <ImageUploader />
            </div>
            <Button
              variant="destructive"
              onClick={() => removeVariant(variant.combination)}
            >
              Supprimer cette variante
            </Button>
          </div>
        ))}
        <Button
          className="bg-slate-500 hover:bg-slate-600 text-white"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (variantsToAdd.length >= 5) {
              alert("Vous ne pouvez pas ajouter plus de 5 variantes.");
              return;
            }
            const combination = `Variante ${variantsToAdd.length + 1}`;
            const mainImage = "";
            const secondaryImages = [];
            addVariant({
              combination,
              mainImage,
              secondaryImages,
              _id: "",
            });
          }}
        >
          Ajouter une variante
        </Button>
      </div>
    )
  );
};

export default VariantsToAdd;
