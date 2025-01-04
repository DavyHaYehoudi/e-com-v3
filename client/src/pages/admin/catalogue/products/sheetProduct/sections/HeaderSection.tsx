import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";

const HeaderSection: React.FC<{
  register: UseFormRegister<ProductInputDTO>; // Type correct pour `register`
  errors: FieldErrors<ProductInputDTO>; // Type correct pour `errors`
  heroImage: File | null;
  handleHeroImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImageUpload: () => void;
}> = ({
  register,
  errors,
  heroImage,
  handleHeroImageUpload,
  handleRemoveImageUpload,
}) => (
  <>
    {/* Nom du produit */}
    <div className="mb-4">
      <Label htmlFor="name">
        Nom<span className="text-red-500 text-2xl">*</span>
      </Label>
      <Input id="name" {...register("name")} placeholder="Nom du produit" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
    </div>

    {/* Image principale */}
    <div className="flex flex-col items-center gap-4 my-20">
      <Label>
        Image du produit sur la carte produit et dans le panier
        <span className="text-red-500 text-2xl">*</span>
      </Label>
      <ImageUploaderBox
        image={heroImage}
        handleImageUpload={handleHeroImageUpload}
        handleRemoveImage={handleRemoveImageUpload}
        width={250}
        height={250}
      />
    </div>
  </>
);

export default HeaderSection;
