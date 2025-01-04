import React, { useState } from "react";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";
import { Label } from "@/components/ui/label";

export interface ImagesCarousselType {
  mainImage: File | null;
  secondaryImages: File[];
}

export interface ImageUploaderProps {
  onImagesUpload: (images: ImagesCarousselType) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUpload }) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);

  const handleMainImageUpload = (image: File | null) => {
    setMainImage(image);
    onImagesUpload({ mainImage: image, secondaryImages });
  };

  const handleSecondaryImageUpload = (image: File) => {
    const updatedSecondaryImages = [...secondaryImages, image];
    setSecondaryImages(updatedSecondaryImages);
    onImagesUpload({ mainImage, secondaryImages: updatedSecondaryImages });
  };

  const handleRemoveMainImage = () => {
    setMainImage(null);
    onImagesUpload({ mainImage: null, secondaryImages });
  };

  const handleRemoveSecondaryImage = (indexToRemove: number) => {
    const updatedSecondaryImages = secondaryImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSecondaryImages(updatedSecondaryImages);
    onImagesUpload({ mainImage, secondaryImages: updatedSecondaryImages });
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
            handleRemoveImage={() => handleRemoveSecondaryImage(index)}
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
