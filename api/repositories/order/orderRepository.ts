import { UpdateOrderDTO } from "../../controllers/order/entities/dto/order.dto.js";
import { BadRequestError } from "../../exceptions/CustomErrors.js";
import { OrderModel } from "../../models/order/order.schema.js";
import { OrderStatusModel } from "../../models/orderStatus/orderStatusSchema.js";
import { orderDataCreateType } from "../../models/types/orderType.js";

export const createOrderRepository = async (orderData: orderDataCreateType) => {
  return await OrderModel.create(orderData);
};

// Récupérer toutes les commandes d'un customer
export const getOrdersCustomerRepository = async (customerId: string) => {
  return await OrderModel.find({ customerId }).sort({ createdAt: -1 }); // Trie par date décroissante (les plus récentes en premier);
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
  return await OrderModel.find()
    .populate({
      path: "customerId", // Le champ dans `Order` qui contient la référence
      select: "firstName lastName", // Les champs à inclure dans la réponse
    })
    .sort({ createdAt: -1 }); // Trie par date décroissante
};

// Admin - Récupérer une commande par son orderId
export const getOrderCustomerByIdFromAdminRepository = async (
  orderId: string
) => {
  return await OrderModel.findById(orderId);
};
// Admin - Supprimer une commande par son orderId
export const deleteOrderByIdRepository = async (orderId: string) => {
  const order = await OrderModel.findById(orderId);
  if (!order) {
    throw new BadRequestError(`Order ${orderId} not found`);
  }
  await OrderModel.findByIdAndDelete(orderId);
};

// Admin - update une commande par son orderId
export const updateOrderByIdRepository = async (
  orderId: string,
  updatedOrderData: UpdateOrderDTO
) => {
  let fieldsToUpdate = {
    orderStatusNumber: 1,
    orderStatusLabel: "",
    orderStatusColor: "",
  };
  if (updatedOrderData.statusOrder) {
    const orderStatus = await OrderStatusModel.findOne({
      number: updatedOrderData.statusOrder,
    });
    if (!orderStatus) {
      throw new BadRequestError(
        `Order status ${updatedOrderData.statusOrder} not found`
      );
    }
    fieldsToUpdate.orderStatusNumber = orderStatus.number;
    fieldsToUpdate.orderStatusLabel = orderStatus.label;
    fieldsToUpdate.orderStatusColor = orderStatus.color;
  }

  const order = await OrderModel.findByIdAndUpdate(orderId, fieldsToUpdate, {
    new: true,
  });
  if (!order) {
    throw new BadRequestError(`Order ${orderId} not found`);
  }
  return order;
};
