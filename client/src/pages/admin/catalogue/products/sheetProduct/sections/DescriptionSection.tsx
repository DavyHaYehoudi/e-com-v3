import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DescriptionSection: React.FC<{
  register: UseFormRegister<ProductInputDTO>; // Type correct pour `register`
  errors: FieldErrors<ProductInputDTO>; // Type correct pour `errors`
}> = ({ register, errors }) => (
  <div className="mb-4">
    <Label htmlFor="description">
    📝 Description<span className="text-red-500 text-2xl">*</span>
    </Label>
    <Textarea
      id="description"
      {...register("description")}
      placeholder="Description du produit"
    />
    {errors.description && (
      <p className="text-red-500">{errors.description.message}</p>
    )}
  </div>
);

export default DescriptionSection;
