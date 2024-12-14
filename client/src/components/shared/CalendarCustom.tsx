import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";

export interface DatePickerProps {
  value: Date | null; // Accepte une date ou null
  onChange: (date: Date) => void; // Callback pour gérer la sélection de date
  disabled?: boolean; // Désactiver le bouton si nécessaire
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  startMonth?: Date;
  endMonth?: Date;
  showOutsideDays?: boolean;
}

const CalendarCustom = ({
  value,
  onChange,
  disabled = false,
  showOutsideDays = true,
  startMonth,
  endMonth,
  captionLayout,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 border rounded-md"
          disabled={disabled}
        >
          <span>
            {value
              ? format(value, "dd/MM/yyyy") // Affiche une date formatée
              : "Sélectionnez une date"}
          </span>
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          captionLayout={captionLayout}
          selected={value ?? undefined} // Passe un objet `Date` ou undefined
          onSelect={(date) => {
            if (date) onChange(new Date(date.setHours(12, 0, 0))); // Définit l'heure à midi
          }}
          locale={fr}
          showOutsideDays={showOutsideDays}
          startMonth={startMonth}
          endMonth={endMonth}
        />
      </PopoverContent>
    </Popover>
  );
};
export default CalendarCustom;
