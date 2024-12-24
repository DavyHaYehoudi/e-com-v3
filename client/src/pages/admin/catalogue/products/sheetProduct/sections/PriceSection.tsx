import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PriceSection: React.FC<{
  register: UseFormRegister<ProductInputDTO>;
  errors: FieldErrors<ProductInputDTO>;
}> = ({ register, errors }) => (
  <div className="mb-4">
    <Label htmlFor="price">
      Prix (€)<span className="text-red-500 text-2xl">*</span>
    </Label>
    <Input
      id="price"
      type="number"
      step="0.01"
      {...register("price", {
        setValueAs: (value) => {
          if (value === "") return undefined; // Si le champ est vide, retourne undefined
          const parsedValue = parseFloat(value);
          return isNaN(parsedValue)
            ? undefined
            : parseFloat(parsedValue.toFixed(2)); // Assure un arrondi à 2 décimales
        },
      })}
      placeholder="Prix du produit"
    />

    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
  </div>
);

export default PriceSection;
