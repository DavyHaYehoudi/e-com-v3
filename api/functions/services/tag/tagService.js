import {
  createTagRepository,
  deleteTagRepository,
  getAllTagsRepository,
  updateTagRepository,
} from "../../repositories/tag/tagRepository.js";
// Récupérer tous les tags
export const getAllTagsService = async () => {
  return await getAllTagsRepository();
};
// Créer un nouveau tag
export const createTagService = async (tagData) => {
  return await createTagRepository(tagData);
};
// Modifier un tag
export const updateTagService = async (tagId, tagData) => {
  return await updateTagRepository(tagId, tagData);
};
// Supprimer un tag
export const deleteTagService = async (tagId) => {
  await deleteTagRepository(tagId);
};
