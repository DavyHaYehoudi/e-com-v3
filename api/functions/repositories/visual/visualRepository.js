import VisualModel from "../../models/visual/visual.schema.js";

// Récupère les visuels d'une page spécifique
export const findByPageVisualRepository = async (page) => {
  return await VisualModel.findOne({ page });
};

// Met à jour les visuels d'une page
export const updateByPageVisualRepository = async (page, images) => {
  return await VisualModel.findOneAndUpdate(
    { page },
    { $set: { images } },
    { new: true, upsert: true } // crée si n'existe pas
  );
};
