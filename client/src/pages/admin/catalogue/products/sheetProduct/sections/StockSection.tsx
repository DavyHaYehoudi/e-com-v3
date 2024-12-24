import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const StockSection: React.FC<{
  register: UseFormRegister<ProductInputDTO>;
  errors: FieldErrors<ProductInputDTO>;
}> = ({ register, errors }) => (
  <div className="mb-4">
    <Label htmlFor="stock">
      Stock<span className="text-red-500 text-2xl">*</span>{" "}
    </Label>
    <Input
      id="stock"
      type="number"
      {...register("quantityInStock", {
        setValueAs: (value) => (value === "" ? undefined : parseInt(value)), // Convertit en nombre ou undefined si vide
      })}
      placeholder="Quantité en stock"
    />
    {errors.quantityInStock && (
      <p className="text-red-500">{errors.quantityInStock.message}</p>
    )}
  </div>
);

export default StockSection;
