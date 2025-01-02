export interface MarketingCampaignDBType {
  _id: string; // L'identifiant unique de la campagne
  subject: string; // Le sujet de la campagne
  content: string; // Le contenu de la campagne
  status: StatusMarketingType; // Le statut de la campagne
  sendDate: Date | null; // La date d'envoi prévue ou null si non définie
  totalSent: number; // Le nombre total de destinataires ayant reçu la campagne
  recipients: string[]; // Liste des destinataires (emails)
  createdAt: Date; // Date de création de la campagne
  updatedAt: Date; // Date de la dernière mise à jour de la campagne
  __v: number; // Version du document (MongoDB)
}
export type StatusMarketingType = "prepared" | "sent";

