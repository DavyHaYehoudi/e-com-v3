import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUploader from "./ImageUploader";

interface VariantsToAddType {
  combination: string;
  mainImage: File | null;
  secondaryImages: File[];
}

interface VariantsProps {
  variantsToAddList: VariantsToAddType[];
  setVariantsToAddList: React.Dispatch<
    React.SetStateAction<VariantsToAddType[]>
  >;
}

const VariantsToAdd: React.FC<VariantsProps> = ({
  variantsToAddList,
  setVariantsToAddList,
}) => {
  const [draftVariant, setDraftVariant] = useState<VariantsToAddType>({
    combination: "",
    mainImage: null,
    secondaryImages: [],
  });

  const handleUpdateDraftVariant = (updated: Partial<VariantsToAddType>) => {
    setDraftVariant((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const addVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!draftVariant.combination.trim() || !draftVariant.mainImage) {
      alert("Veuillez remplir tous les champs avant d'ajouter une variante.");
      return;
    }

    setVariantsToAddList((prev) => [...prev, draftVariant]);
    setDraftVariant({
      combination: "",
      mainImage: null,
      secondaryImages: [],
    });
  };

  const removeVariant = (index: number) => {
    setVariantsToAddList((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (
    index: number,
    updated: Partial<VariantsToAddType>
  ) => {
    setVariantsToAddList((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, ...updated } : variant
      )
    );
  };

  return (
    <div className="my-8 border rounded-md p-4">
      <h3 className="mb-4 text-lg font-bold">Gerer les Variantes</h3>

      {/* Liste des variantes confirmées */}
      {variantsToAddList.map((variant, index) => (
        <div key={index} className="mb-4 border rounded p-4">
          <Label className="text-sm font-medium mb-2">Combinaison :</Label>
          <Input
            type="text"
            value={variant.combination}
            onChange={(e) =>
              updateVariant(index, { combination: e.target.value })
            }
          />
          <div className="mt-2">
            <Label className="text-sm font-medium">Image principale :</Label>
            {variant.mainImage && (
              <img
                src={URL.createObjectURL(variant.mainImage)}
                alt="Image principale"
                className="w-24 h-24 object-cover mt-2"
              />
            )}
          </div>
          <div className="mt-2">
            <Label className="text-sm font-medium">Images secondaires :</Label>
            <div className="flex gap-2 mt-2">
              {variant.secondaryImages.map((image, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(image)}
                  alt={`Image secondaire ${i + 1}`}
                  className="w-16 h-16 object-cover"
                />
              ))}
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              removeVariant(index);
            }}
            className="mt-2"
          >
            Supprimer
          </Button>
        </div>
      ))}

      {/* Ajouter une nouvelle variante */}
      <div className="border rounded p-4 mt-6">
        <h4 className="mb-4 font-medium">Nouvelle Variante</h4>
        <Label className="text-sm font-medium mb-2">Combinaison :</Label>
        <Input
          type="text"
          value={draftVariant.combination}
          placeholder="Nommer la variante"
          onChange={(e) =>
            handleUpdateDraftVariant({ combination: e.target.value })
          }
        />
        <ImageUploader
          onImagesUpload={(images) =>
            handleUpdateDraftVariant({
              mainImage: images.mainImage,
              secondaryImages: images.secondaryImages,
            })
          }
        />
        <Button onClick={addVariant} className="mt-4">
          Ajouter cette variante
        </Button>
      </div>
    </div>
  );
};

export default VariantsToAdd;
