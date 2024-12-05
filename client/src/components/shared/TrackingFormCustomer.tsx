"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import useTrackingCustomer from "../pages/dashboard/customer/hooks/useTrackingCustomer";

// Schéma de validation Zod
const trackingSchema = z.object({
  tracking_number: z.string().min(1, "Le numéro de suivi est obligatoire."),
  date_sending: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La date doit être au format YYYY-MM-DD."),
});

// Typage TypeScript
type TrackingFormValues = z.infer<typeof trackingSchema>;

interface TrackingFormProps {
  orderId?: string;
}

const TrackingFormCustomer = ({ orderId }: TrackingFormProps) => {
  const [existingTracking, setExistingTracking] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { trackingCustomerFetch, trackingCustomerUpdate } =
    useTrackingCustomer(orderId);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TrackingFormValues>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      tracking_number: "",
      date_sending: "",
    },
  });

  // Charger les données existantes
  useEffect(() => {
    const loadTracking = async () => {
      const trackings = await trackingCustomerFetch();
      const isTrackingCustomer =
        trackings && trackings.find((track) => track.sender === "customer");
      if (isTrackingCustomer) {
        setExistingTracking(true);
        setValue("tracking_number", isTrackingCustomer.tracking_number);
        const parsedDate = new Date(isTrackingCustomer.date_sending);
        setDate(parsedDate);
        setValue("date_sending", isTrackingCustomer.date_sending); // Utiliser directement la date au format `YYYY-MM-DD`
      }
    };
    loadTracking();
  }, [trackingCustomerFetch, setValue]);

  // Mise à jour de la date dans react-hook-form
  useEffect(() => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]; // Convertir la date en `YYYY-MM-DD`
      setValue("date_sending", formattedDate);
    }
  }, [date, setValue]);

  // Soumission du formulaire
  const onSubmit = async (data: TrackingFormValues) => {
    try {
      if (date) {
        const formattedDate = date.toISOString().split("T")[0]; // Convertir la date en `YYYY-MM-DD`
        setValue("date_sending", formattedDate);
      }
      await trackingCustomerUpdate(data);
      toast("Numéro de suivi ajouté avec succès !");
    } catch (error) {
      toast("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle>
          {existingTracking
            ? "Modifiez votre numero de suivi"
            : "Ajoutez votre numero de suivi en cas de retour"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="tracking_number" className="block font-medium">
              Numéro de suivi
            </label>
            <Input
              id="tracking_number"
              placeholder="Entrez le numéro de suivi"
              {...register("tracking_number")}
              className={errors.tracking_number ? "border-red-500" : ""}
            />
            {errors.tracking_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tracking_number.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="date_sending" className="block font-medium">
              Date d'envoi
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "dd/MM/yyyy")
                  ) : (
                    <span>Choisir une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) =>
                    setDate(selectedDate || undefined)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date_sending && (
              <p className="text-red-500 text-sm mt-1">
                {errors.date_sending.message}
              </p>
            )}
          </div>

          <CardFooter>
            <Button type="submit">
              {existingTracking
                ? "Modifier le numéro de suivi"
                : "Ajouter le numéro de suivi"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
export default TrackingFormCustomer;
