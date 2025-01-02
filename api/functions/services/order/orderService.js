import {
  deleteOrderByIdRepository,
  getAllOrdersRepository,
  getOrderCustomerByIdFromAdminRepository,
  getOrderCustomerByIdRepository,
  getOrdersCustomerRepository,
  updateOrderByIdRepository,
} from "../../repositories/order/orderRepository.js";
// Récupérer toutes les commandes d'un customer
export const getOrdersCustomerService = async (customerId) => {
  return await getOrdersCustomerRepository(customerId);
};
// Récupérer une commande par son orderId et qui est du customer
export const getOrderCustomerByIdService = async (orderId, customerId) => {
  return await getOrderCustomerByIdRepository(orderId, customerId);
};
// Admin - Récupérer toutes les commandes
export const getAllOrdersService = async () => {
  return await getAllOrdersRepository();
};
// Admin - Récupérer une commande par son orderId
export const getOrderCustomerByIdFromAdminService = async (orderId) => {
  return await getOrderCustomerByIdFromAdminRepository(orderId);
};
// Admin - Supprimer une commande par son orderId
export const deleteOrderByIdService = async (orderId) => {
  await deleteOrderByIdRepository(orderId);
};
// Admin - update une commande par son orderId
export const updateOrderByIdService = async (orderId, updatedOrderData) => {
  return await updateOrderByIdRepository(orderId, updatedOrderData);
};
