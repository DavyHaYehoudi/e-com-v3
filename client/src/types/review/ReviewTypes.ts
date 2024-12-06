export interface ReviewDBType {
    _id: string; // ID de l'avis
    customerId: string; // ID du client ayant laissé l'avis
    orderId: string | null; // ID de la commande associée (peut être null)
    productId: string; // ID du produit évalué
    reviewText: string; // Texte de l'avis
    rating: number; // Note attribuée (exemple : 1 à 5)
    isValidateByAdmin: boolean; // Statut de validation par un administrateur
    createdAt: string; // Date de création au format ISO
    updatedAt: string; // Date de mise à jour au format ISO
    __v: number; // Version du document (contrôlée par MongoDB)
  }
  