import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CashbackSection: React.FC<{
  register: UseFormRegister<ProductInputDTO>;
  errors: FieldErrors<ProductInputDTO>;
}> = ({ register, errors }) => (
  <div className="mb-4">
    <Label htmlFor="cashback">
      💰{" "}
      <span className="bg-blue-500 text-white p-1 rounded-md">
        Cashback (€)
      </span>
    </Label>
    <Input
      id="cashback"
      type="number"
      step="0.01" // Autorise les nombres décimaux
      {...register("cashback", {
        setValueAs: (value) => {
          if (value === "") return undefined; // Si le champ est vide, retourne undefined
          const parsedValue = parseFloat(value);
          return isNaN(parsedValue)
            ? undefined
            : parseFloat(parsedValue.toFixed(2)); // Assure un arrondi à 2 décimales
        },
      })}
      placeholder="Montant du cashback"
    />
    {errors.cashback && (
      <p className="text-red-500">{errors.cashback.message}</p>
    )}
  </div>
);

export default CashbackSection;
