export interface PromocodeVerifyType {
  code: string;
  promocodePercentage: number;
}
export interface PromocodeDBType {
  _id: string; // L'identifiant unique du code promo
  code: string; // Le code promotionnel
  promocodePercentage: number; // Le nombre de produits liés au code promo
  startDate: Date; // La date de début de la promotion
  endDate: Date; // La date de fin de la promotion
  __v: number; // Le numéro de version du document (généralement pour Mongoose)
}
