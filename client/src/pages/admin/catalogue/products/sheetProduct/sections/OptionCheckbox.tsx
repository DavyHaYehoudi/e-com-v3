import React from "react";
import { Control, Controller } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Checkbox } from "@/components/ui/checkbox";

interface OptionCheckboxProps {
  name: "isStar" | "continueSelling" | "isPublished";
  control: Control<ProductInputDTO>;
  labelChecked: string;
  id: string;
}

const OptionCheckbox: React.FC<OptionCheckboxProps> = ({
  name,
  control,
  labelChecked,
  id,
}) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
            />

            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {labelChecked}
            </label>
          </div>
        )}
      />
    </div>
  );
};

export default OptionCheckbox;
