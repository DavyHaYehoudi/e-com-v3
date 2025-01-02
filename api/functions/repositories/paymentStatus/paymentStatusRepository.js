import { OrderModel } from "../../models/order/order.schema.js";
import { PaymentStatusModel } from "../../models/paymentStatus/paymentStatusSchema.js";

// Admin - Configuration status payment
export const paymentStatusRespository = async (number, label, color) => {
  return await PaymentStatusModel.create({ number, label, color });
};

export const getPaymentStatusRespository = async () => {
  return await PaymentStatusModel.find();
};

// Customer - Mettre à jour le statut de payment d'une commande venant d'être créée
export const updatePaymentStatusRepository = async (
  customerId,
  orderNumber,
  statusNumber
) => {
  // Récupérer les statuts de payment
  const paymentStatuses = await getPaymentStatusRespository();
  const paymentStatus = paymentStatuses.find(
    (ps) => ps.number === statusNumber
  );

  // Mettre à jour le statut de payment dans la commande
  await OrderModel.findOneAndUpdate(
    { orderNumber, customerId },
    {
      paymentStatusLabel: paymentStatus?.label,
      paymentStatusColor: paymentStatus?.color,
      paymentStatusNumber: paymentStatus?.number,
    }
  );
};
