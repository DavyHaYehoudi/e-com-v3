import React from "react";
import { Plus } from "lucide-react";

interface ImageUploaderBoxProps {
  image: File | null;
  setImage: (image: File | null) => void;
  width: number;
  height: number;
}

const ImageUploaderBox: React.FC<ImageUploaderBoxProps> = ({
  image,
  setImage,
  width,
  height,
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        <>
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
    </div>
  );
};

export default ImageUploaderBox;
