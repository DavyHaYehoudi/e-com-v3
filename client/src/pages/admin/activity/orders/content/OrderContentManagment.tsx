import React, { useEffect } from "react";
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
import useOrder from "@/hooks/dashboard/admin/useOrder";
import { toast } from "sonner";

interface OrderContentManagementProps {
  orderId: string;
  orderItem: OrderItem;
  handleManagment: (value: ContentManagmentType, orderItemId: string) => void;
}

export interface ContentManagmentType {
  returnNumber: number | null;
  returnAt: Date | null;
  exchangeNumber: number | null;
  exchangeAt: Date | null;
  refundAmount: number | null;
  refundAt: Date | null;
}

const OrderContentManagement: React.FC<OrderContentManagementProps> = ({
  orderId,
  orderItem,
  handleManagment,
}) => {
  const { udpateOrder } = useOrder({ orderId });
  const { control, handleSubmit, reset, setValue } =
    useForm<ContentManagmentType>({
      defaultValues: {
        returnNumber: null,
        returnAt: null,
        exchangeNumber: null,
        exchangeAt: null,
        refundAmount: null,
        refundAt: null,
      },
    });

  useEffect(() => {
    if (orderItem) {
      setValue("returnNumber", orderItem.returnNumber ?? null);
      setValue("returnAt", orderItem.returnAt ?? null);
      setValue("exchangeNumber", orderItem.exchangeNumber ?? null);
      setValue("exchangeAt", orderItem.exchangeAt ?? null);
      setValue("refundAmount", orderItem.refundAmount ?? null);
      setValue("refundAt", orderItem.refundAt ?? null);
    }
  }, [orderItem, setValue]);

  const onSubmit = async (data: ContentManagmentType) => {
    const formattedData = {
      _id: orderItem._id,
      productId: orderItem.productId,
      name: orderItem.name,
      variant: orderItem.variant,
      customerId: orderItem.customerId,
      articleNumber: orderItem.articleNumber,
      heroImage: orderItem.heroImage,
      priceBeforePromotionOnProduct: orderItem.priceBeforePromotionOnProduct,
      promotionPercentage: orderItem.promotionPercentage,
      cashbackEarned: orderItem.cashbackEarned,
      returnNumber: data.returnNumber ?? null,
      returnAt: data.returnAt ? new Date(data.returnAt) : null,
      exchangeNumber: data.exchangeNumber ?? null,
      exchangeAt: data.exchangeAt ? new Date(data.exchangeAt) : null,
      refundAmount: data.refundAmount ?? null,
      refundAt: data.refundAt ? new Date(data.refundAt) : null,
    };

    await udpateOrder({ orderItem: formattedData }).then((result) => {
      if (result) {
        toast.success("Mise à jour réussie");
        handleManagment(data, orderItem._id);
        reset();
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">...</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-96 min-w-[300px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h5 className="font-medium leading-none">Gestion</h5>
              <p className="text-sm text-muted-foreground">
                {orderItem.name} {orderItem.variant}
              </p>
            </div>

            {/* Retour */}
            <div className="space-y-4 bg-pink-50 dark:bg-pink-900 p-4 rounded">
              <h6 className="font-medium underline underline-offset-4 text-pink-700 dark:text-pink-300">
                Retour
              </h6>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="returnNumber">Nombre d'articles</Label>
                <Controller
                  name="returnNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="returnNumber"
                      type="number"
                      {...field}
                      value={field.value !== null ? field.value : ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value, 10) : null
                        )
                      }
                      className="col-span-2 h-8"
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label>Date appliquée</Label>
                <Controller
                  name="returnAt"
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
            <div className="space-y-4 bg-blue-50 dark:bg-blue-900 p-4 rounded">
              <h6 className="font-medium underline underline-offset-4 text-blue-700 dark:text-blue-300">
                Échange
              </h6>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="exchangeNumber">Nombre d'articles</Label>
                <Controller
                  name="exchangeNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="exchangeNumber"
                      type="number"
                      {...field}
                      value={field.value !== null ? field.value : ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value, 10) : null
                        )
                      }
                      className="col-span-2 h-8"
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label>Date appliquée</Label>
                <Controller
                  name="exchangeAt"
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
            <div className="space-y-4 bg-green-50 dark:bg-green-900 p-4 rounded">
              <h6 className="font-medium underline underline-offset-4 text-green-700 dark:text-green-300">
                Remboursement
              </h6>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="refundAmount">Montant remboursé (€)</Label>
                <Controller
                  name="refundAmount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="refundAmount"
                      type="number"
                      {...field}
                      value={field.value !== null ? field.value : ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                      className="col-span-2 h-8"
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label>Date appliquée</Label>
                <Controller
                  name="refundAt"
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
