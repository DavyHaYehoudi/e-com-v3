import { Request, Response, NextFunction } from "express";
import {
  paymentStatusService,
  updatePaymentStatusService,
} from "../../services/paymentStatus/paymentStatusService.js";
import { CustomJwtPayload } from "../../middlewares/authMiddleware";
// ADMIN
export const paymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { number, label, color } = req.body;
    await paymentStatusService(number, label, color);
    res.status(201).json({});
  } catch (error) {
    next(error);
  }
};

// Customer - Mettre à jour le statut de payment d'une commande venant d'être créée
export const updatePaymentStatusFromCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const { orderNumber, statusNumber } = req.body;
    await updatePaymentStatusService(customerId, orderNumber, statusNumber);
    res.status(200).json({});
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
