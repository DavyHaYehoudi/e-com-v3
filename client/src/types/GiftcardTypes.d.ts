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
  _id: string; // Identifiant unique de la carte cadeau
  code: string; // Code unique de la carte cadeau
  balance: number; // Solde restant sur la carte cadeau
  amountToUse?: number; // Montant à utiliser sur cette carte cadeau
}

export interface GiftcardCustomerDBType {
  _id: string; // Identifiant unique de la carte cadeau
  firstHolderId: string; // ID du premier détenteur de la carte cadeau
  initialValue: number; // Valeur initiale de la carte cadeau
  balance: number; // Solde actuel de la carte cadeau
  isIssuedByAdmin: boolean; // Indique si la carte a été émise par un administrateur
  usageHistory: Array<UsageHistoryEntry>; // Historique des utilisations
  code: string; // Code unique de la carte cadeau
  expirationDate: string; // Date d'expiration (au format ISO ou autre)
  createdAt: string; // Date de création (format ISO)
  updatedAt: string; // Date de dernière mise à jour (format ISO)
  __v: number; // Version du document (MongoDB)
}

// Typage pour un élément de l'historique d'utilisation
export interface UsageHistoryEntry {
  usedByCustomerId: string; // Id du customer l'ayant utilisé
  amountUsed: number;
  createdAt: string; // Date de création (format ISO)
  updatedAt: string; // Date de dernière mise à jour (format ISO)
}
