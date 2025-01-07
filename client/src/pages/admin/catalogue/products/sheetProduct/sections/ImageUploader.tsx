import React from "react";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";
import { Label } from "@/components/ui/label";

export interface ImagesCarousselType {
  mainImage: File | string | null;
  secondaryImages: (File | string)[];
}

export interface ImageUploaderProps {
  mainImage: File | string | null;
  secondaryImages: (File | string)[];
  onImagesUpload: (images: ImagesCarousselType) => void;
  setUrlFirebaseToDelete:React.Dispatch<
      React.SetStateAction<string[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  mainImage,
  secondaryImages,
  onImagesUpload,
  setUrlFirebaseToDelete
}) => {
  const handleMainImageUpload = (image: File | string | null) => {
    onImagesUpload({ mainImage: image, secondaryImages });
  };

  const handleSecondaryImageUpload = (image: File | string) => {
    const updatedSecondaryImages = [...secondaryImages, image];
    onImagesUpload({ mainImage, secondaryImages: updatedSecondaryImages });
  };

  const handleRemoveMainImage = (image: File | string) => {
    onImagesUpload({ mainImage: null, secondaryImages });
    if (typeof image === "string") {
      setUrlFirebaseToDelete((prev) => [...prev, image]);
    }
  };

  const handleRemoveSecondaryImage = (indexToRemove: number,image: File | string) => {
    const updatedSecondaryImages = secondaryImages.filter(
      (_, index) => index !== indexToRemove
    );
    onImagesUpload({ mainImage, secondaryImages: updatedSecondaryImages });
    if (typeof image === "string") {
      setUrlFirebaseToDelete((prev) => [...prev, image]);
    }
  };

  return (
    <div className="mt-4">
      <Label className="text-sm font-medium">Image principale :</Label>
      <ImageUploaderBox
        image={mainImage}
        handleImageUpload={(e) =>
          handleMainImageUpload(e.target.files?.[0] || null)
        }
        handleRemoveImage={handleRemoveMainImage}
        width={200}
        height={200}
      />

      <Label className="text-sm font-medium mt-4">Images secondaires :</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {secondaryImages.map((image, index) => (
          <ImageUploaderBox
            key={index}
            image={image}
            handleImageUpload={(e) =>
              handleSecondaryImageUpload(e.target.files?.[0] as File)
            }
            handleRemoveImage={() => handleRemoveSecondaryImage(index,image)}
            width={100}
            height={100}
          />
        ))}
        {/* Boîte vide pour ajouter une nouvelle image */}
        <ImageUploaderBox
          image={null}
          handleImageUpload={(e) =>
            handleSecondaryImageUpload(e.target.files?.[0] as File)
          }
          handleRemoveImage={() => {}}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
