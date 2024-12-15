export interface TagDBType {
    _id: string; // L'identifiant unique du tag
    label: string; // Le nom ou libellé du tag
    productCount: number; // Le nombre de produits liés au tag
    createdAt: string; // La date de création au format ISO 8601
    updatedAt: string; // La date de dernière mise à jour au format ISO 8601
    __v: number; // Le numéro de version du document (généralement pour Mongoose)
  }
  