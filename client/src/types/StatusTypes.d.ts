export type OrderStatusLabelType =
  | "A traiter"
  | "En cours de traitement"
  | "Expédiée"
  | "Retournée"
  | "Retour partiel";

export type PaymentStatusLabelType =
  | "Payée"
  | "En attente"
  | "Refusée"
  | "Remboursée"
  | "Remboursement partiel";

export interface OrderStatusType {
  label: OrderStatusLabelType;
  number: number;
  color: string;
}
export interface PaymentStatusType {
  label: PaymentStatusLabelType;
  number: number;
  color: string;
}
