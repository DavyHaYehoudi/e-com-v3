import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUploader from "./ImageUploader";
import { fileOptimize } from "@/utils/imageManage";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";

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
  handleRemoveVariantImage: (
    indexVariantToRemove: number,
    image: File | string | null,
    type: "mainImage" | "secondaryImages",
    indexImageSecondaryToRemove?: number
  ) => void;
}

const VariantsToAdd: React.FC<VariantsProps> = ({
  variantsToAddList,
  setVariantsToAddList,
  setUrlFirebaseToDelete,
  handleRemoveVariantImage,
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
  const checkCompleted = (variant: VariantsToAddType) => {
    return variant.combination && variant.mainImage;
  };
  return (
    <div className="my-8 border rounded-md p-4">
      <h3 className="mb-4 text-2xl font-bold">Liste des Variantes</h3>
      {variantsToAddList.map((variant, index) => (
        <div key={index} className="mb-4 border rounded p-4">
          <p
            className={`text-end text-xs ${
              checkCompleted(variant) ? "text-green-500" : "text-red-500"
            }`}
          >
            {checkCompleted(variant)
              ? "Variante complète"
              : "Variante incomplète"}
          </p>
          {/* Combinaison */}
          <Label className="text-sm font-medium mb-2">Combinaison :</Label>
          <Input
            type="text"
            value={variant.combination}
            onChange={(e) =>
              updateVariant(index, { combination: e.target.value })
            }
          />
          {/* Main Image */}
          <div className="mt-2">
            <Label className="text-sm font-medium">Image principale :</Label>
            <ImageUploaderBox
              image={variant.mainImage}
              handleImageUpload={(e) =>
                updateVariant(index, { mainImage: e.target.files?.[0] })
              }
              handleRemoveImage={() =>
                handleRemoveVariantImage(index, variant.mainImage, "mainImage")
              }
              width={200}
              height={200}
            />
          </div>
          {/* Secondary Images */}
          <div className="mt-2">
            <Label className="text-sm font-medium">Images secondaires :</Label>
            <div className="flex gap-2 mt-2">
              {variant.secondaryImages.map((url, i) => (
                <ImageUploaderBox
                  image={url}
                  handleImageUpload={() => {}}
                  handleRemoveImage={() =>
                    handleRemoveVariantImage(index, url, "secondaryImages", i)
                  }
                  width={100}
                  height={100}
                />
              ))}
              {/* Image en attente */}
              <ImageUploaderBox
                image={null}
                handleImageUpload={(e) => {
                  if (e.target.files && e.target.files.length > 0)
                    updateVariant(index, {
                      secondaryImages: [
                        ...variant.secondaryImages,
                        e.target.files[0],
                      ],
                    });
                }}
                handleRemoveImage={() => {}}
                width={100}
                height={100}
              />
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
