import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUploader from "./ImageUploader";
import { fileOptimize, resolveImageUrl } from "@/utils/imageManage";
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

  console.log("draftVariant:", draftVariant);
  const [imageURLs, setImageURLs] = useState<{
    main: string | null;
    secondary: string[];
  }>({
    main: null,
    secondary: [],
  });
  console.log("imageURLs :", imageURLs);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] =
    useState<VariantsToAddType | null>(null);

  useEffect(() => {
    const fetchImageURLs = async () => {
      if (draftVariant.mainImage) {
        const mainUrl = await fileOptimize(draftVariant.mainImage);
        setImageURLs((prev) => ({ ...prev, main: mainUrl }));
      }
      const secondaryUrls = await Promise.all(
        draftVariant.secondaryImages.map(fileOptimize)
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

  const removeVariant = (variant: VariantsToAddType | null) => {
    setIsDeleteOpen(false);

    // Collecter les URLs à supprimer
    const urlsToDelete: string[] = [];

    // Vérifier si mainImage est un string
    if (typeof variant?.mainImage === "string") {
      urlsToDelete.push(variant.mainImage);
    }

    // Filtrer les URLs valides dans secondaryImages
    const secondaryUrls =
      variant?.secondaryImages.filter(
        (image): image is string => typeof image === "string"
      ) || "";

    // Mettre à jour le state avec les URLs collectées
    setUrlFirebaseToDelete((prev) => [
      ...prev,
      ...urlsToDelete,
      ...secondaryUrls,
    ]);

    // Supprimer la variante de la liste
    setVariantsToAddList((prev) =>
      prev.filter(
        (variantInList) => variantInList.combination !== variant?.combination
      )
    );
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
                src={resolveImageUrl(variant.mainImage) || ""}
                alt="Image principale"
                className="w-24 h-24 object-cover mt-2 rounded-md"
              />
            )}
          </div>
          <div className="mt-2">
            <Label className="text-sm font-medium">Images secondaires :</Label>
            <div className="flex gap-2 mt-2">
              {variant.secondaryImages.map((url, i) => (
                <img
                  key={i}
                  src={resolveImageUrl(url) || ""}
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
              setSelectedVariant(variant);
            }}
            className="mt-2"
          >
            Supprimer
          </Button>
          <DeleteAlert
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
            itemNameToDelete={`la variante : ${selectedVariant?.combination}`}
            onConfirm={() => removeVariant(selectedVariant)}
          />
        </div>
      ))}
      {/* Nouvelle variante */}
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
        <div className="flex items-center justify-between gap-2 flex-wrap mt-4">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleUpdateDraftVariant({
                combination: "",
                mainImage: null,
                secondaryImages: [],
              });
            }}
            className=""
          >
            Annuler
          </Button>
          <Button onClick={addVariant} className="">
            Ajouter cette variante
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VariantsToAdd;
