import React from "react";
import { Control, Controller } from "react-hook-form";
import { ProductInputDTO } from "../productSchema";
import { Switch } from "@/components/ui/switch";

interface OptionSwitchProps {
  name: "isStar" | "isPublished";
  control: Control<ProductInputDTO>;
  labelChecked: string;
  labelUnchecked: string;
  id: string;
}

const OptionSwitch: React.FC<OptionSwitchProps> = ({
  name,
  control,
  labelChecked,
  labelUnchecked,
  id,
}) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Switch
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="bg-gray-200 border-gray-300 dark:border-gray-500"
            />
            {field.value ? (
              <span className="text-xs text-green-500">{labelChecked}</span>
            ) : (
              <span className="text-xs text-gray-500">{labelUnchecked}</span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default OptionSwitch;
