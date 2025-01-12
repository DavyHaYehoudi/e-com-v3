import React from "react";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";
import { Label } from "@/components/ui/label";

export interface CommonImagesProps {
  commonImages: (File | string)[];
  onImagesUpload: (images: File | string) => void;
  onImagesRemove: (indexToRemove: number, image: File | string) => void;
}

const CommonImages: React.FC<CommonImagesProps> = ({
  commonImages,
  onImagesUpload,
  onImagesRemove,
}) => {
  const handleCommonImagesUpload = (image: File | string) => {
    onImagesUpload(image);
  };

  const handleRemoveCommonImage = (
    indexToRemove: number,
    image: File | string
  ) => {
    onImagesRemove(indexToRemove, image);
  };

  return (
    <div className="mt-4">
      <Label className="text-sm font-medium mt-4">
        Images communes aux variantes :
      </Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {commonImages.map((image, index) => (
          <ImageUploaderBox
            key={index}
            image={image}
            handleImageUpload={(e) =>
              handleCommonImagesUpload(e.target.files?.[0] as File)
            }
            handleRemoveImage={() => handleRemoveCommonImage(index, image)}
            width={100}
            height={100}
          />
        ))}
        {/* Boîte vide pour ajouter une nouvelle image */}
        <ImageUploaderBox
          image={null}
          handleImageUpload={(e) =>
            handleCommonImagesUpload(e.target.files?.[0] as File)
          }
          handleRemoveImage={() => {}}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default CommonImages;
