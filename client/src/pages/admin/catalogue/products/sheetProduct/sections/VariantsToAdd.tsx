import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUploader from "./ImageUploader";
import { resolveImageUrl } from "@/utils/imageManage";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";

interface VariantsToAddType {
  combination: string;
  mainImage: File | string | null;
  secondaryImages: (File | string)[];
}

interface VariantsProps {
  variantsToAddList: VariantsToAddType[];
  setVariantsToAddList: React.Dispatch<
    React.SetStateAction<VariantsToAddType[]>
  >;
  setUrlFirebaseToDelete: React.Dispatch<React.SetStateAction<string[]>>;
}

const VariantsToAdd: React.FC<VariantsProps> = ({
  variantsToAddList,
  setVariantsToAddList,
  setUrlFirebaseToDelete,
}) => {
  const [draftVariant, setDraftVariant] = useState<VariantsToAddType>({
    combination: "",
    mainImage: null,
    secondaryImages: [],
  });

  const [imageURLs, setImageURLs] = useState<{
    main: string | null;
    secondary: string[];
  }>({
    main: null,
    secondary: [],
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchImageURLs = async () => {
      if (draftVariant.mainImage) {
        const mainUrl = await resolveImageUrl(draftVariant.mainImage);
        setImageURLs((prev) => ({ ...prev, main: mainUrl }));
      }
      const secondaryUrls = await Promise.all(
        draftVariant.secondaryImages.map(resolveImageUrl)
      );

      // Filtrage des `null`
      setImageURLs((prev) => ({
        ...prev,
        secondary: secondaryUrls.filter((url): url is string => url !== null),
      }));
    };
    fetchImageURLs();
  }, [draftVariant]);

  const handleUpdateDraftVariant = (updated: Partial<VariantsToAddType>) => {
    setDraftVariant((prev) => ({ ...prev, ...updated }));
  };

  const addVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!draftVariant.combination.trim() || !draftVariant.mainImage) {
      alert("Veuillez remplir tous les champs avant d'ajouter une variante.");
      return;
    }

    setVariantsToAddList((prev) => [...prev, draftVariant]);
    setDraftVariant({ combination: "", mainImage: null, secondaryImages: [] });
  };

  const removeVariant = (index: number) => {
    setIsDeleteOpen(false);
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
      <h3 className="mb-4 text-lg font-bold">Gérer les Variantes</h3>

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
                src={imageURLs.main || ""}
                alt="Image principale"
                className="w-24 h-24 object-cover mt-2 rounded-md"
              />
            )}
          </div>
          <div className="mt-2">
            <Label className="text-sm font-medium">Images secondaires :</Label>
            <div className="flex gap-2 mt-2">
              {imageURLs.secondary.map((url, i) => (
                <img
                  key={i}
                  src={url || ""}
                  alt={`Image secondaire ${i + 1}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
            className="mt-2"
          >
            Supprimer
          </Button>
          <DeleteAlert
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
            itemNameToDelete="cette variante"
            onConfirm={() => removeVariant(index)}
          />
        </div>
      ))}

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
          mainImage={draftVariant.mainImage}
          secondaryImages={draftVariant.secondaryImages}
          onImagesUpload={(images) =>
            handleUpdateDraftVariant({
              mainImage: images.mainImage,
              secondaryImages: images.secondaryImages,
            })
          }
          setUrlFirebaseToDelete={setUrlFirebaseToDelete}
        />
        <Button onClick={addVariant} className="mt-4">
          Ajouter cette variante
        </Button>
      </div>
    </div>
  );
};

export default VariantsToAdd;
