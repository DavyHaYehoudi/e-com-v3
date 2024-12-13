import { Address } from "../customer/CustomerTypes";

export interface OrderCreated {
  customerId: string;
  orderStatusLabel: string;
  orderStatusNumber: number;
  paymentStatusLabel: string;
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
  cashbackEarned: number;
  exchangeNumber: number | null;
  exchangeAt: string | null;
  refundNumber: number | null;
  refundAt: string | null;
  refundAmount: number | null;
  returnNumber: number | null;
  returnAt: string | null;
  _id: string;
}
interface TrackingInfo {
  trackingNumber: string;
  dateSending: string;
}
export interface OrderCustomerDBType {
  _id: string; // Identifiant unique de la commande
  customerId: string; // Identifiant du client
  orderStatusLabel: string; // Libellé du statut de la commande
  orderStatusNumber: number; // Numéro correspondant au statut de la commande
  orderStatusColor: string; // Couleur correspondant au statut de la commande
  paymentStatusLabel: string; // Libellé du statut de paiement
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
  orderItems: OrderItem[]; // Liste des articles commandés
  createdAt: string; // Date de création (format ISO)
  updatedAt: string; // Date de mise à jour (format ISO)
  __v: number; // Version du document (MongoDB)
}
