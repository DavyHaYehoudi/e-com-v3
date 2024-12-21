import { useState } from "react";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { imagesCaroussel } from "../CreateProduct";

export interface ImageUploaderProps {
  onImagesUpload: (images: imagesCaroussel) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUpload }) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);

  const handleSecondaryImageUpload = (image: File | null) => {
    if (image) {
      setSecondaryImages([...secondaryImages, image]);
    }
  };
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onImagesUpload({ mainImage, secondaryImages });
  };
  return (
    <div>
      <div className="flex items-center flex-wrap gap-4">
        {/* Image principale */}
        <div>
          <Label>1ère image dans le caroussel</Label>
          <ImageUploaderBox
            image={mainImage}
            setImage={setMainImage}
            width={200}
            height={200}
          />
        </div>

        {/* Images secondaires */}
        <div className="flex flex-wrap gap-4">
          {secondaryImages.map((image, index) => (
            <ImageUploaderBox
              key={index}
              image={image}
              setImage={() => {}}
              width={100}
              height={100}
            />
          ))}

          {/* Ajouter une nouvelle image secondaire */}
          <ImageUploaderBox
            image={null}
            setImage={handleSecondaryImageUpload}
            width={100}
            height={100}
          />
        </div>
      </div>
      {/* Bouton de validation */}
      <Button
        className="my-4"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSave(e)}
        disabled={!mainImage}
      >
        Sauvegarder
      </Button>
    </div>
  );
};

export default ImageUploader;
