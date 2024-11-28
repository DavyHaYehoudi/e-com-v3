import { CreateTagDTO } from "../../controllers/tag/entities/dto/tag.dto.js";
import Tag from "../../models/tag/tag.schema.js";

// Créer un tag
export const createTagRepository = async (data: CreateTagDTO) => {
  try {
    const tag = await Tag.create({ label: data.label });
    return tag;
  } catch (error: any) {
    throw new Error(`Erreur lors de la création du tag : ${error.message}`);
  }
};

// Récupérer tous les tags
export const getAllTagsRepository = async () => {
  try {
    const tags = await Tag.find();
    return tags;
  } catch (error: any) {
    throw new Error(
      `Erreur lors de la récupération des tags : ${error.message}`
    );
  }
};

// Supprimer un tag
export const deleteTagRepository = async (tagId: string) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(tagId);
    if (!deletedTag) {
      throw new Error("Tag introuvable.");
    }
    return deletedTag;
  } catch (error: any) {
    throw new Error(`Erreur lors de la suppression du tag : ${error.message}`);
  }
};
