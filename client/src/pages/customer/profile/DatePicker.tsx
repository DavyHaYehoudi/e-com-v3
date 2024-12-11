import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
// import CalendarYear from "@/components/shared/CalendarYear";
import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";

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
        <DayPicker
          mode="single"
          captionLayout="dropdown-years"
          selected={value ?? undefined} // Passe un objet `Date` ou `null`
          onSelect={(date) =>
            date && onChange(new Date(date.setHours(12, 0, 0)))
          } // Définit l'heure à midi pour éviter le décalage
          startMonth={new Date(1960, 0)} // Début de la plage (janvier 1960)
          endMonth={new Date(2030, 11)} // Fin de la plage (décembre 2030)
          locale={fr}
          showOutsideDays={true}
          footer={
            value
              ? `Selectionnée : ${value.toLocaleDateString()}`
              : "Choisir un jour."
          }
        />
      </PopoverContent>
    </Popover>
  );
}
