export interface CartGiftcardsToBuyFrontType {
  idTemp: number;
  quantity: number;
  amount: number;
}

export interface GiftcardCheckType {
  _id: string; // Identifiant unique de la carte cadeau
  balance: number; // Solde restant sur la carte cadeau
  code: string; // Code unique de la carte cadeau
}
export interface GiftcardToUseFrontType {
  _id?: string; // Identifiant unique de la carte cadeau
  code: string; // Code unique de la carte cadeau
  balance?: number; // Solde restant sur la carte cadeau
  amountToUse: number; // Montant à utiliser sur cette carte cadeau
}
