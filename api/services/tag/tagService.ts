import { CreateTagDTO } from "../../controllers/tag/entities/dto/tag.dto.js";
import {
  createTagRepository,
  deleteTagRepository,
  getAllTagsRepository,
} from "../../repositories/tag/tagRepository.js";

// Récupérer tous les tags
export const getAllTagsService = async () => {
  return await getAllTagsRepository();
};

// Créer un nouveau tag
export const createTagService = async (tagData: CreateTagDTO) => {
  return await createTagRepository(tagData);
};

// Supprimer un tag
export const deleteTagService = async (tagId: string) => {
  await deleteTagRepository(tagId);
};
