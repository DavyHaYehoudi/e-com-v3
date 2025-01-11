interface customerIdInReviewType {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}
export interface ReviewDBType {
  _id: string; // ID de l'avis
  customerId: customerIdInReviewType;
  orderId: string | null; // ID de la commande associée (peut être null)
  productId: string; // ID du produit évalué
  reviewText: string; // Texte de l'avis
  rating: number; // Note attribuée (exemple : 1 à 5)
  status: StatusType; // Statut de validation par un administrateur
  createdAt: Date; // Date de création au format ISO
  updatedAt: Date; // Date de mise à jour au format ISO
  __v: number; // Version du document (contrôlée par MongoDB)
}
export type StatusType = "pending" | "refused" | "approved";
