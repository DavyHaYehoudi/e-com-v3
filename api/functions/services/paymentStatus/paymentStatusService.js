import {
  getPaymentStatusRespository,
  paymentStatusRespository,
  updatePaymentStatusRepository,
} from "../../repositories/paymentStatus/paymentStatusRepository.js";
export const paymentStatusService = async (number, label, color) => {
  await paymentStatusRespository(number, label, color);
};
export const getPaymentStatusService = async () => {
  return getPaymentStatusRespository();
};
// Customer - Mettre à jour le statut de payment d'une commande venant d'être créée
export const updatePaymentStatusService = async (
  customerId,
  orderNumber,
  statusNumber
) => {
  await updatePaymentStatusRepository(customerId, orderNumber, statusNumber);
};
