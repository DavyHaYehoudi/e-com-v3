import { getCustomerByIdRepository } from "../../repositories/customer/customerRepository.js";
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
  const order = await getOrderCustomerByIdFromAdminRepository(orderId);
  // Récupérer le profil du customer
  const customerId = order.customerId;
  const customer = await getCustomerByIdRepository(customerId);
  // Ajouter à order la cle customerIdentity
  const customerIdentity = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    avatarUrl: customer.avatarUrl,
  };
  const orderWithCustomer = { ...order.toJSON(), customerIdentity };
  return orderWithCustomer;
};
// Admin - Supprimer une commande par son orderId
export const deleteOrderByIdService = async (orderId) => {
  await deleteOrderByIdRepository(orderId);
};
// Admin - update une commande par son orderId
export const updateOrderByIdService = async (orderId, updatedOrderData) => {
  return await updateOrderByIdRepository(orderId, updatedOrderData);
};
