import { Request, Response, NextFunction } from "express";
import { paymentAmountVisitorSchema } from "./entities/dto/paymentAmountVisitor.dto.js";
import {
  createOrderService,
  getPaymentAmountCustomerService,
  getPaymentAmountVisitorService,
  getPaymentIntentService,
} from "../../services/payment/paymentService.js";
import { paymentAmountCustomerSchema } from "./entities/dto/paymentAmountCustomer.dto.js";
import { CustomJwtPayload } from "../../middlewares/authMiddleware.js";
import { createOrderSchema } from "./entities/dto/paymentConfirmation.dto.js";
import { custom } from "zod";

// PUBLIC - Calcul du total de la commande pour un visiteur
export const getPaymentAmountVisitor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentData = paymentAmountVisitorSchema.parse(req.body);
    const paymentAmount = await getPaymentAmountVisitorService(paymentData);

    res.status(200).json(paymentAmount);
  } catch (error) {
    next(error);
  }
};
// CUSTOMER - Calcul du total de la commande pour un customer
export const getPaymentAmountCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const paymentData = paymentAmountCustomerSchema.parse(req.body);
    const paymentAmount = await getPaymentAmountCustomerService(
      customerId,
      paymentData
    );

    res.status(200).json(paymentAmount);
  } catch (error) {
    next(error);
  }
};
// CUSTOMER - Intention de payment par Stripe
export const getPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const paymentData = paymentAmountCustomerSchema.parse(req.body);
    const paymentIntent = await getPaymentIntentService(
      customerId,
      paymentData
    );

    res.status(200).json(paymentIntent);
  } catch (error) {
    next(error);
  }
};
// CUSTOMER - Confirmation de commande
export const confirmationOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const paymentConfirmationData = createOrderSchema.parse(req.body);
    const orderCreated = await createOrderService(
      customerId,
      paymentConfirmationData
    );
    res.status(201).json(orderCreated);
  } catch (error) {
    next(error);
  }
};
