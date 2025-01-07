import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { resolveImageUrl } from "@/utils/imageManage";
import LoadingSpinner from "./LoadingSpinner";

interface ImageUploaderBoxProps {
  image: File | string | null;
  width: number;
  height: number;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (image: File | string) => void;
}

const ImageUploaderBox: React.FC<ImageUploaderBoxProps> = ({
  image,
  handleImageUpload,
  handleRemoveImage,
  width,
  height,
}) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        setIsLoading(true);
        const url = await resolveImageUrl(image);
        setImageURL(url);
      } catch (error) {
        console.error("Erreur lors de la gestion de l'image :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageURL();
  }, [image]);
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div
      className={`relative border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {image ? (
        <div className="relative w-full h-full">
          {/* Image existante */}
          <img
            src={imageURL ?? ""}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ) : (
        <>
          {/* Image en attente */}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
          <Plus
            className="text-gray-500 dark:text-gray-300"
            style={{ width: width / 3, height: height / 3 }}
          />
        </>
      )}

      {/* Bouton pour supprimer l'image, en dehors de l'input */}
      {image && (
        <button
          onClick={(e) => {
            e.preventDefault(); // Empêche tout comportement par défaut
            handleRemoveImage(image);
          }}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          aria-label="Supprimer l'image"
          style={{ zIndex: 10 }} // S'assure que le bouton est au-dessus de l'image
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ImageUploaderBox;
