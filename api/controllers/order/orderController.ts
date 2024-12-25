import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../middlewares/authMiddleware";
import {
  deleteOrderByIdService,
  getAllOrdersService,
  getOrderCustomerByIdFromAdminService,
  getOrderCustomerByIdService,
  getOrdersCustomerService,
  updateOrderByIdService,
} from "../../services/order/orderService.js";
import { updateOrderSchema } from "./entities/dto/order.dto.js";

// Récupérer toutes les commandes d'un customer
export const getOrdersCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const orders = await getOrdersCustomerService(customerId);
    res.status(200).json(orders);
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

// Récupérer une commande par son orderId et qui est du customer
export const getOrderCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const orderId = req.params.orderId;
    const order = await getOrderCustomerByIdService(orderId, customerId);
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }
    res.status(200).json(order);
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

// admin access
export const getOrdersCustomerFromAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.params.customerId;
    const orders = await getOrdersCustomerService(customerId);
    res.status(200).json(orders);
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
// Récupérer par l'admin une commande par son orderId
export const getOrderCustomerByIdFromAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;
    const order = await getOrderCustomerByIdFromAdminService(orderId);
    res.status(200).json(order);
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

// Récupérer toutes les commandes
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json(orders);
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
// Admin - Supprimer une commande par son orderId
export const deleteOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;
    await deleteOrderByIdService(orderId); // Vérifie que la commande existe
    res.status(200).json({});
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
// Admin - update une commande par son orderId
export const updateOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrderData = updateOrderSchema.parse(req.body);
    await updateOrderByIdService(orderId, updatedOrderData);
    res.status(200).json({});
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
