import { UpdateOrderDTO } from "../../controllers/order/entities/dto/order.dto.js";
import {
  deleteOrderByIdRepository,
  getAllOrdersRepository,
  getOrderCustomerByIdFromAdminRepository,
  getOrderCustomerByIdRepository,
  getOrdersCustomerRepository,
  updateOrderByIdRepository,
} from "../../repositories/order/orderRepository.js";

// Récupérer toutes les commandes d'un customer
export const getOrdersCustomerService = async (customerId: string) => {
  return await getOrdersCustomerRepository(customerId);
};

// Récupérer une commande par son orderId et qui est du customer
export const getOrderCustomerByIdService = async (
  orderId: string,
  customerId: string
) => {
  return await getOrderCustomerByIdRepository(orderId, customerId);
};

// Admin - Récupérer toutes les commandes
export const getAllOrdersService = async () => {
  return await getAllOrdersRepository();
};
// Admin - Récupérer une commande par son orderId
export const getOrderCustomerByIdFromAdminService = async (orderId: string) => {
  return await getOrderCustomerByIdFromAdminRepository(orderId);
};
// Admin - Supprimer une commande par son orderId
export const deleteOrderByIdService = async (orderId: string) => {
  await deleteOrderByIdRepository(orderId);
};
// Admin - update une commande par son orderId
export const updateOrderByIdService = async (
  orderId: string,
  updatedOrderData: UpdateOrderDTO
) => {
  return await updateOrderByIdRepository(orderId, updatedOrderData);
};
