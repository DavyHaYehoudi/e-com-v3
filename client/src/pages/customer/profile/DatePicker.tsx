import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import CalendarYear from "@/components/shared/CalendarYear";

export function DatePicker({
  value,
  onChange,
  disabled,
}: {
  value: Date | null; // Accepter `null` comme valeur
  onChange: (date: Date) => void;
  disabled: boolean;
}) {
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
        <CalendarYear
          mode="single"
          captionLayout="dropdown-buttons"
          selected={value ?? undefined} // Passe un objet `Date` ou `null`
          onSelect={(date) => date && onChange(date)} // Ignore si `null`
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
}
