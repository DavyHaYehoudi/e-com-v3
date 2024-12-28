import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CalendarCustom from "@/components/shared/CalendarCustom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrackingInfo } from "@/types/order/OrderTypes";
import useOrder from "@/hooks/dashboard/admin/useOrder";
import { toast } from "sonner";

interface TrackingNumberProps {
  handleTrackingNumber: (data: TrackingInfo) => void;
  trackingNumberInfo: TrackingInfo | null;
  orderId: string;
}

const TrackingNumber: React.FC<TrackingNumberProps> = ({
  handleTrackingNumber,
  trackingNumberInfo,
  orderId,
}) => {
  const { udpateOrder } = useOrder({ orderId });
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<TrackingInfo>({
    defaultValues: {
      trackingNumber: "",
      dateSending: null,
    },
  });
  useEffect(() => {
    if (trackingNumberInfo) {
      setValue("trackingNumber", trackingNumberInfo.trackingNumber ?? null);
      setValue("dateSending", trackingNumberInfo.dateSending ?? null);
    }
  }, [trackingNumberInfo, setValue]);
  const onSubmit = async (data: TrackingInfo) => {
    const trackingNumber = {
      trackingNumber: data.trackingNumber,
      dateSending: data.dateSending ? new Date(data.dateSending) : null,
    };
    await udpateOrder({ trackingNumber }).then((result) => {
      if (result) {
        toast.success("Mise à jour réussie");
        handleTrackingNumber(data);
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    });
  };
  return (
    <Card className="max-w-lg mx-auto bg-gray-800 text-white shadow-lg">
      <CardHeader>
        <h3 className="text-lg font-semibold text-teal-400">Numero de suivi</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tracking Number Field */}
          <div>
            <Label htmlFor="trackingNumber" className="text-teal-300">
              Numéro de suivi
            </Label>
            <Input
              id="trackingNumber"
              placeholder="Entrez le numéro de suivi"
              {...register("trackingNumber", {
                required: "Le numéro de suivi est obligatoire.",
              })}
              className={`mt-1 ${
                errors.trackingNumber ? "border-red-500" : "border-teal-300"
              }`}
            />
            {errors.trackingNumber && (
              <p className="text-red-400 text-sm mt-1">
                {errors.trackingNumber.message}
              </p>
            )}
          </div>

          {/* dateSending */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <Label htmlFor="dateSending" className="text-teal-300">
              Date d'envoi
            </Label>
            <Controller
              name="dateSending"
              control={control}
              render={({ field }) => (
                <CalendarCustom
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" className="bg-teal-500 hover:bg-teal-400">
              Valider
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TrackingNumber;
