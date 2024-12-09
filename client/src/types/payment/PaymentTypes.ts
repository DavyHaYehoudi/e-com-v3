export interface PaymentAmountResponse {
  orderAmount: number; // Montant total de la commande avant promotions et réductions
  promocodeAmount: number; // Montant de la réduction appliquée grâce au code promo
  totalAmountBeforePromocode: number; // Total avant application du code promo
  promocodePercentage: number; // Pourcentage de réduction lié au code promo
  amountPercentage: number; // Pourcentage d'autres réductions appliquées
  totalPromotionAmount: number; // Montant total des promotions appliquées
  amountGiftcardUsed: number; // Montant des cartes cadeaux utilisées
  cashbackToUse: number; // Montant du cashback utilisé
}
