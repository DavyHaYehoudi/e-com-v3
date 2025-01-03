import { Address } from "./CustomerTypes";
import {
  OrderStatusLabelType,
  PaymentStatusLabelType,
} from "./StatusTypes";

export interface OrderCreated {
  customerId: string;
  orderStatusLabel: OrderStatusLabelType;
  orderStatusNumber: number;
  paymentStatusLabel: PaymentStatusLabelType;
  paymentStatusNumber: number;
  orderNumber: string;
  promocodeAmount: number;
  promocodePercentage: number;
  totalPrice: number;
  totalPromotionOnProduct: number;
  orderAddressShipping: Address;
  orderAddressBilling: Address;
  cashbackEarned: number;
  cashbackSpent: number;
  trackingNumber: string | null;
  orderItems: OrderItem[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  variant: string;
  customerId: string;
  articleNumber: number;
  heroImage: string;
  priceBeforePromotionOnProduct: number;
  promotionPercentage: number;
  amountPercentage: number;
  cashbackEarned: number;
  exchangeNumber: number | null;
  exchangeAt: Date | null;
  refundNumber: number | null;
  refundAt: Date | null;
  refundAmount: number | null;
  returnNumber: number | null;
  returnAt: Date | null;
  _id: string;
}
export interface TrackingInfo {
  trackingNumber: string;
  dateSending: Date | null;
}
export interface CustomerIdentityType {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}
export interface OrderCustomerDBType {
  _id: string; // Identifiant unique de la commande
  customerId: string; // Identifiant du client
  customerIdentity: CustomerIdentityType; // Informations sur le client
  orderStatusLabel: OrderStatusLabelType; // Libellé du statut de la commande
  orderStatusNumber: number; // Numéro correspondant au statut de la commande
  orderStatusColor: string; // Couleur correspondant au statut de la commande
  paymentStatusLabel: PaymentStatusLabelType; // Libellé du statut de paiement
  paymentStatusNumber: number; // Numéro correspondant au statut de paiement
  paymentStatusColor: string; // Couleur correspondant au statut de paiement
  orderNumber: string; // Numéro de commande
  promocodeAmount: number; // Montant de la réduction grâce au code promo
  promocodePercentage: number; // Pourcentage de réduction du code promo
  totalPrice: number; // Prix total de la commande
  totalPromotionOnProduct: number; // Montant total des promotions sur les produits
  orderAddressShipping: Address; // Adresse de livraison
  orderAddressBilling: Address; // Adresse de facturation
  cashbackEarned: number; // Montant de cashback gagné
  cashbackSpent: number; // Montant de cashback utilisé
  trackingNumber: TrackingInfo | null; // Numéro de suivi (si disponible)
  totalNumberArticles: number; // Nombre d'articles vendus dans cette commande
  orderItems: OrderItem[]; // Liste des articles commandés
  createdAt: string; // Date de création (format ISO)
  updatedAt: string; // Date de mise à jour (format ISO)
  __v: number; // Version du document (MongoDB)
}
