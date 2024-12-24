import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CashbackSection: React.FC<{
  register: UseFormRegister<ProductInputDTO>;
  errors: FieldErrors<ProductInputDTO>;
}> = ({ register, errors }) => (
  <div className="mb-4">
    <Label htmlFor="cashback" className="bg-blue-500 text-white p-1 rounded-md">
      Cashback (€)
    </Label>
    <Input
      id="cashback"
      type="number"
      step="0.01" // Autorise les nombres décimaux
      {...register("cashback", {
        setValueAs: (value) => (value === "" ? undefined : parseFloat(value)), // Convertit en nombre ou undefined si vide
      })}
      placeholder="Montant du cashback"
    />
    {errors.cashback && (
      <p className="text-red-500">{errors.cashback.message}</p>
    )}
  </div>
);

export default CashbackSection;
