import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStatus from "@/hooks/dashboard/admin/useStatus";
import { OrderStatusType, PaymentStatusType } from "@/types/status/StatusTypes";
import React, { useEffect, useState } from "react";

interface OrderContentStatusProps {
  handlePaymentStatusChange: (status: string) => void;
  handleOrderStatusChange: (status: string) => void;
  statusOrderNumber: number | null;
  statusPaymentNumber: number | null;
}

const OrderContentStatus: React.FC<OrderContentStatusProps> = ({
  statusOrderNumber,
  statusPaymentNumber,
  handleOrderStatusChange,
  handlePaymentStatusChange,
}) => {
  const [ordersStatus, setOrdersStatus] = useState<OrderStatusType[]>([]);
  const [paymentsStatus, setPaymentsStatus] = useState<PaymentStatusType[]>([]);
  const { statusOrderFetch, statusPaymentFetch } = useStatus();
  useEffect(() => {
    if (ordersStatus.length === 0) {
      statusOrderFetch().then((status) => setOrdersStatus(status || []));
    }
    if (paymentsStatus.length === 0) {
      statusPaymentFetch().then((status) => setPaymentsStatus(status || []));
    }
  }, [ordersStatus, paymentsStatus, statusOrderFetch, statusPaymentFetch]);
  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <Select
        value={statusPaymentNumber?.toString()}
        onValueChange={handlePaymentStatusChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Statut du paiement" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Statuts</SelectLabel>
            {paymentsStatus &&
              paymentsStatus.length > 0 &&
              paymentsStatus.map((os) => (
                <SelectItem
                  key={`${os.label}-${os.color}`}
                  value={os.number.toString()}
                >
                  {os.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={statusOrderNumber?.toString()}
        onValueChange={handleOrderStatusChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Statut de la commande" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Statuts</SelectLabel>
            {ordersStatus &&
              ordersStatus.length > 0 &&
              ordersStatus.map((os) => (
                <SelectItem
                  key={`${os.label}-${os.color}`}
                  value={os.number.toString()}
                >
                  {os.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrderContentStatus;
