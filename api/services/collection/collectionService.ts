import { CreateCollectionDTO } from "../../controllers/collection/entities/dto/collection.dto.js";
import {
  createCollectionRepository,
  deleteCollectionRepository,
  getAllCollectionsRepository,
  updateCollectionRepository,
} from "../../repositories/collection/collectionRepository.js";

export const getAllCollectionsService = async () => {
  return await getAllCollectionsRepository();
};
export const createCollectionService = async (label: CreateCollectionDTO) => {
  return await createCollectionRepository(label);
};
// Update une collection
export const updateCollectionService = async (
  collectionId: string,
  label: CreateCollectionDTO
) => {
  return await updateCollectionRepository(collectionId, label);
};
export const deleteCollectionService = async (collectionId: string) => {
  return await deleteCollectionRepository(collectionId);
};
