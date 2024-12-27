import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrderItem } from "@/types/order/OrderTypes";
import CalendarCustom from "@/components/shared/CalendarCustom";

interface OrderContentManagementProps {
  item: OrderItem;
}

interface FormValues {
  return: number;
  returnDate: Date | null;
  exchange: number;
  exchangeDate: Date | null;
  refund: number;
  refundDate: Date | null;
}

const OrderContentManagement: React.FC<OrderContentManagementProps> = ({
  item,
}) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      return: 0,
      returnDate: null,
      exchange: 0,
      exchangeDate: null,
      refund: 0,
      refundDate: null,
    },
  });

  // Gestion de la soumission
  const onSubmit = (data: FormValues) => {
    console.log("Submitted data:", data);
    reset(); // Réinitialisez le formulaire après soumission si nécessaire
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">...</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h5 className="font-medium leading-none">Gestion</h5>
              <p className="text-sm text-muted-foreground">
                Gérer les retours, échanges et remboursements pour : <br/>{item.name}
              </p>
            </div>

            {/* Retour */}
            <div className="space-y-4">
              <h6 className="font-medium underline underline-offset-4">Retour</h6>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="return">Nombre d'articles</Label>
                <Controller
                  name="return"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="return"
                      type="number"
                      {...field}
                      className="col-span-2 h-8"
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label>Date appliquée</Label>
                <Controller
                  name="returnDate"
                  control={control}
                  render={({ field }) => (
                    <CalendarCustom
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </div>
            </div>

            {/* Échange */}
            <div className="space-y-4">
              <h6 className="font-medium underline underline-offset-4">Echange</h6>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="exchange">Nombre d'articles</Label>
                <Controller
                  name="exchange"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="exchange"
                      type="number"
                      {...field}
                      className="col-span-2 h-8"
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label>Date appliquée</Label>
                <Controller
                  name="exchangeDate"
                  control={control}
                  render={({ field }) => (
                    <CalendarCustom
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </div>
            </div>

            {/* Remboursement */}
            <div className="space-y-4">
              <h6 className="font-medium underline underline-offset-4">Remboursement</h6>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="refund">Montant remboursé (€)</Label>
                <Controller
                  name="refund"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="refund"
                      type="number"
                      {...field}
                      className="col-span-2 h-8"
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label>Date appliquée</Label>
                <Controller
                  name="refundDate"
                  control={control}
                  render={({ field }) => (
                    <CalendarCustom
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full">
              Valider
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default OrderContentManagement;
