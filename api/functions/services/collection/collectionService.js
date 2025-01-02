import {
  createCollectionRepository,
  deleteCollectionRepository,
  getAllCollectionsRepository,
  updateCollectionRepository,
} from "../../repositories/collection/collectionRepository.js";
export const getAllCollectionsService = async () => {
  return await getAllCollectionsRepository();
};
export const createCollectionService = async (label) => {
  return await createCollectionRepository(label);
};
// Update une collection
export const updateCollectionService = async (collectionId, label) => {
  return await updateCollectionRepository(collectionId, label);
};
export const deleteCollectionService = async (collectionId) => {
  return await deleteCollectionRepository(collectionId);
};
