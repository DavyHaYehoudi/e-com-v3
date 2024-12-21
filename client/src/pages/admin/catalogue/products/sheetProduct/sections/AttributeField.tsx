import React from "react";
import { Control, Controller } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Label } from "@/components/ui/label";
import CalendarCustom from "@/components/shared/CalendarCustom";
import CancelBtnDashboard from "@/components/shared/CancelBtnDashboard";
import { formatDate } from "@/utils/formatDate";

interface AttributeFieldProps {
  name: "newUntil";
  control: Control<ProductInputDTO>;
  label: string;
  value: Date | null;
  setValue: (name: "newUntil", value: Date | null) => void;
  error?: string;
  getValues: (name: "newUntil") => Date;
}

const AttributeField: React.FC<AttributeFieldProps> = ({
  name,
  control,
  label,
  value,
  setValue,
  error,
  getValues,
}) => {
  return (
    <div className="mb-4 flex items-center gap-4 flex-wrap">
      <Label
        htmlFor={name}
        className="bg-blue-100 text-blue-800 p-2 rounded-md"
      >
        {label}
        <br />
        <span>{formatDate(getValues("newUntil"))}</span>
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <CalendarCustom
              value={value}
              onChange={(date) => setValue(name, date)}
            />
            {field.value && (
              <CancelBtnDashboard onCancel={() => field.onChange(null)} />
            )}
          </div>
        )}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AttributeField;
