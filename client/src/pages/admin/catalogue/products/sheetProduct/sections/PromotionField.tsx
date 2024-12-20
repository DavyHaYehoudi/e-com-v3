import CalendarCustom from "@/components/shared/CalendarCustom";
import CancelBtnDashboard from "@/components/shared/CancelBtnDashboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
interface PromotionFieldProps {
  control: Control<ProductInputDTO>;
  value: Date | null;
  setValue: (
    name: "promotionPercentage" | "promotionEndDate",
    value: Date | null
  ) => void;
  error?: string;
  register: UseFormRegister<ProductInputDTO>;
}
const PromotionField: React.FC<PromotionFieldProps> = ({
  control,
  value,
  setValue,
  error,
  register,
}) => {
  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      <div>
        <Label htmlFor="promotionPercentage" className="text-center">
          Pourcentage de promotion (%)
        </Label>
        <Input
          id="promotionPercentage"
          type="number"
          {...register("promotionPercentage", {
            setValueAs: (value) => (value === "" ? undefined : parseInt(value)), // Convertit en nombre ou undefined si vide
          })}
        />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Label htmlFor="promotionEndDate" className="text-center">
          Date de fin de promotion
        </Label>
        <Controller
          control={control}
          name="promotionEndDate"
          render={({ field }) => (
            <div className="flex items-center gap-4 flex-wrap">
              <CalendarCustom
                value={value}
                onChange={(date) => setValue("promotionEndDate", date)}
              />{" "}
              {field.value && (
                <CancelBtnDashboard onCancel={() => field.onChange(null)} />
              )}
            </div>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default PromotionField;
