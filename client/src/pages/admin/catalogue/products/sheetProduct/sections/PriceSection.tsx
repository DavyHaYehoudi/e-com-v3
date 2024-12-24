import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PriceSection: React.FC<{
  register: UseFormRegister<ProductInputDTO>;
  errors: FieldErrors<ProductInputDTO>;
}> = ({ register, errors }) => (
  <div className="mb-4">
    <Label htmlFor="price">Prix (€)<span className="text-red-500 text-2xl" >*</span></Label>
    <Input
      id="price"
      type="number"
      step="0.01" // Autorise les nombres décimaux
      {...register("price", {
        setValueAs: (value) => (value === "" ? undefined : parseFloat(value)), // Convertit en nombre ou undefined si vide
      })}
      placeholder="Prix du produit"
    />
    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
  </div>
);

export default PriceSection;
