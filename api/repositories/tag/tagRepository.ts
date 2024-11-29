import { CreateTagDTO } from "../../controllers/tag/entities/dto/tag.dto.js";
import {
  MongooseDuplicateError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import Tag from "../../models/tag/tag.schema.js";

// Créer un tag
export const createTagRepository = async (data: CreateTagDTO) => {
  try {
    return await Tag.create({ label: data.label });
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB Duplicate Key Error
      throw new MongooseDuplicateError(
        `A tag with the label "${data.label}" already exists.`
      );
    }
    throw new Error(`Error creating tag : ${error.message}`);
  }
};

// Récupérer tous les tags
export const getAllTagsRepository = async () => {
  try {
    return await Tag.find();
  } catch (error: any) {
    throw new Error(`Error retrieving tags : ${error.message}`);
  }
};

// Supprimer un tag
export const deleteTagRepository = async (tagId: string) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(tagId);
    if (!deletedTag) {
      throw new NotFoundError(`Tag with ID ${tagId} not found`);
    }
    return deletedTag;
  } catch (error: any) {
    throw new Error(`Error deleting tag : ${error.message}`);
  }
};
