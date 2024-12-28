import {
  TrackingNumberDTO,
  UpdateOrderDTO,
} from "../../controllers/order/entities/dto/order.dto.js";
import { BadRequestError } from "../../exceptions/CustomErrors.js";
import { OrderModel } from "../../models/order/order.schema.js";
import { OrderStatusModel } from "../../models/orderStatus/orderStatusSchema.js";
import { PaymentStatusModel } from "../../models/paymentStatus/paymentStatusSchema.js";
import { OrderItemType } from "../../models/types/orderItemType.js";
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

export type FieldsToUpdateOrder = {
  orderStatusNumber?: number;
  orderStatusLabel?: string;
  orderStatusColor?: string;
  paymentStatusNumber?: number;
  paymentStatusLabel?: string;
  paymentStatusColor?: string;
  trackingNumber: TrackingNumberDTO;
  orderItem?: OrderItemType;
};
// Admin - update une commande par son orderId
export const updateOrderByIdRepository = async (
  orderId: string,
  updatedOrderData: UpdateOrderDTO
) => {
  const { statusOrder, statusPayment, orderItem, trackingNumber } =
    updatedOrderData;

  // Préparation des champs de mise à jour pour la commande
  const fieldsToUpdate: Partial<FieldsToUpdateOrder> = {};

  if (statusOrder !== undefined) {
    const orderStatus = await OrderStatusModel.findOne({
      number: statusOrder,
    });
    if (!orderStatus) {
      throw new BadRequestError(`Order status ${statusOrder} not found`);
    }
    fieldsToUpdate.orderStatusNumber = orderStatus.number;
    fieldsToUpdate.orderStatusLabel = orderStatus.label;
    fieldsToUpdate.orderStatusColor = orderStatus.color;
  }

  if (statusPayment !== undefined) {
    const paymentStatus = await PaymentStatusModel.findOne({
      number: statusPayment,
    });
    if (!paymentStatus) {
      throw new BadRequestError(`Payment status ${statusPayment} not found`);
    }
    fieldsToUpdate.paymentStatusNumber = paymentStatus.number;
    fieldsToUpdate.paymentStatusLabel = paymentStatus.label;
    fieldsToUpdate.paymentStatusColor = paymentStatus.color;
  }

  // Mise à jour du numéro de suivi
  if (trackingNumber) {
    fieldsToUpdate.trackingNumber = trackingNumber;
  }

  // Mise à jour d'un orderItem si nécessaire
  if (orderItem) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new BadRequestError(`Order ${orderId} not found`);
    }

    // Trouver l'élément à mettre à jour
    const itemIndex = order.orderItems.findIndex(
      (item) => (item as any)._id.toString() === orderItem._id
    ); // Ajout de as any car au niveau de typescript _id n'existe pas explicitement dans un document orderItem

    if (itemIndex === -1) {
      throw new BadRequestError(`Order item ${orderItem._id} not found`);
    }

    // Remplacement des anciennes valeurs par celles du req.body
    order.orderItems[itemIndex] = {
      ...order.orderItems[itemIndex],
      ...orderItem,
    };

    // Sauvegarder la commande avec l'élément mis à jour
    await order.save();
  }

  // Mise à jour des champs principaux de la commande
  if (Object.keys(fieldsToUpdate).length > 0) {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: fieldsToUpdate },
      { new: true }
    );
    if (!updatedOrder) {
      throw new BadRequestError(`Order ${orderId} not found`);
    }
    return updatedOrder;
  }

  // Retourner la commande mise à jour si aucune mise à jour n'était nécessaire pour statusOrder/statusPayment
  return await OrderModel.findById(orderId);
};
