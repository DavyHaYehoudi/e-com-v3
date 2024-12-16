import { CreateTagDTO } from "../../controllers/tag/entities/dto/tag.dto.js";
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
export const createTagService = async (tagData: CreateTagDTO) => {
  return await createTagRepository(tagData);
};
// Modifier un tag
export const updateTagService = async (
  tagId: string,
  tagData: CreateTagDTO
) => {
  return await updateTagRepository(tagId, tagData);
};
// Supprimer un tag
export const deleteTagService = async (tagId: string) => {
  await deleteTagRepository(tagId);
};
