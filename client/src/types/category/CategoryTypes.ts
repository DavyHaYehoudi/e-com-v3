export interface CategoryDBType {
    _id: string; // L'identifiant unique de la catégorie
    label: string; // Le nom ou libellé de la catégorie
    createdAt: string; // La date de création au format ISO 8601
    updatedAt: string; // La date de dernière mise à jour au format ISO 8601
    __v: number; // Le numéro de version du document (généralement pour Mongoose)
  }
  