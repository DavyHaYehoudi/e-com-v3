import { OrderModel } from "../../models/order/order.schema.js";
import { orderDataCreateType } from "../../models/types/orderType.js";

export const createOrderRepository = async (orderData: orderDataCreateType) => {
  return await OrderModel.create(orderData);
};

// Récupérer toutes les commandes d'un customer
export const getOrdersCustomerRepository = async (customerId: string) => {
  return await OrderModel.find({ customerId });
};

// Récupérer une commande par son orderId et qui est du customer
export const getOrderCustomerByIdRepository = async (
  orderId: string,
  customerId: string
) => {
  return await OrderModel.findOne({ _id: orderId, customerId });
};

// Admin - Récupérer toutes les commandes
export const getAllOrdersRepository = async () => {
  return await OrderModel.find();
};
// Admin - Récupérer une commande par son orderId
export const getOrderCustomerByIdFromAdminRepository = async (
  orderId: string
) => {
  console.log("orderId:", orderId);
  return await OrderModel.findById(orderId);
};
