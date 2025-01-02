import {
  getPaymentStatusService,
  paymentStatusService,
  updatePaymentStatusService,
} from "../../services/paymentStatus/paymentStatusService.js";
// ADMIN
export const paymentStatus = async (req, res, next) => {
  try {
    const { number, label, color } = req.body;
    await paymentStatusService(number, label, color);
    res.status(201).json({});
  } catch (error) {
    next(error);
  }
};
// ADMIN - Récupérer tous les status payment
export const getAllPaymentStatuses = async (req, res, next) => {
  try {
    const paymentStatuses = await getPaymentStatusService();
    res.json(paymentStatuses);
  } catch (error) {
    next(error);
  }
};
// Customer - Mettre à jour le statut de payment d'une commande venant d'être créée
export const updatePaymentStatusFromCustomer = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const { orderNumber, statusNumber } = req.body;
    await updatePaymentStatusService(customerId, orderNumber, statusNumber);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};
