import { CreateTagDTO } from "../../controllers/tag/entities/dto/tag.dto.js";
import {
  BadRequestError,
  MongooseDuplicateError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import { ProductModel } from "../../models/product/product.schema.js";
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
    const tagsWithProductCounts = await Tag.aggregate([
      {
        $lookup: {
          from: "products", // Nom de la collection des produits
          localField: "_id", // Champ local dans la collection Tag
          foreignField: "tags", // Champ dans la collection Product
          as: "products", // Alias pour les données jointes
        },
      },
      {
        $addFields: {
          productCount: { $size: "$products" }, // Compte les produits liés
        },
      },
      {
        $project: {
          products: 0, // Exclut le tableau de produits de la réponse
        },
      },
    ]);

    return tagsWithProductCounts;
  } catch (error: any) {
    throw new Error(
      `Error retrieving tags with product counts: ${error.message}`
    );
  }
};

// Modifier un tag
export const updateTagRepository = async (
  tagId: string,
  data: CreateTagDTO
) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(
      tagId,
      { label: data.label },
      { new: true }
    );
    if (!updatedTag) {
      throw new NotFoundError(`Tag with ID ${tagId} not found`);
    }
    return updatedTag;
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB Duplicate Key Error
      throw new MongooseDuplicateError(
        `A tag with the label "${data.label}" already exists.`
      );
    }
    throw new Error(`Error updating tag : ${error.message}`);
  }
};

// Supprimer un tag
export const deleteTagRepository = async (tagId: string) => {
  // Vérifier si le tag est utilisé dans un produit
  const productsUsingTag = await ProductModel.find({
    tags: { $in: [tagId] },
  }).exec();

  if (productsUsingTag.length > 0) {
    // Si le tag est associé à des produits, ne pas permettre la suppression
    throw new BadRequestError(
      `This tag is used in one or more products and cannot be removed.`
    );
  }
  const deletedTag = await Tag.findByIdAndDelete(tagId);
  if (!deletedTag) {
    throw new NotFoundError(`Tag with ID ${tagId} not found`);
  }
  return deletedTag;
};
