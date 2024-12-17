import { CreateCategoryDTO } from "../../controllers/category/entities/dto/category.dto.js";
import {
  BadRequestError,
  MongooseDuplicateError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import Category from "../../models/category/category.schema.js";
import { ProductModel } from "../../models/product/product.schema.js";

export const getAllCategoriesRepository = async () => {
  // await Category.syncIndexes();

  try {
    const categoriesWithProductCounts = await Category.aggregate([
      {
        $lookup: {
          from: "products", // Nom de la collection des produits
          localField: "_id", // Champ local dans la collection Tag
          foreignField: "categories", // Champ dans la collection Product
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

    return categoriesWithProductCounts;
  } catch (error: any) {
    throw new Error(
      `Error retrieving tags with product counts: ${error.message}`
    );
  }
};

export const createCategoryRepository = async (data: CreateCategoryDTO) => {
  try {
    return await Category.create({ label: data.label });
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB Duplicate Key Error
      throw new MongooseDuplicateError(
        `A category with the label "${data.label}" already exists.`
      );
    }
    throw new Error(`Error creating category : ${error.message}`);
  }
};

// Update une catégorie
export const updateCategoryRepository = async (
  categoryId: string,
  data: CreateCategoryDTO
) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { label: data.label },
      { new: true }
    );
    if (!updatedCategory) {
      throw new NotFoundError(`Category with ID ${categoryId} not found`);
    }
    return updatedCategory;
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB Duplicate Key Error
      throw new MongooseDuplicateError(
        `A category with the label "${data.label}" already exists.`
      );
    }
    throw new Error(`Error updating category : ${error.message}`);
  }
};

export const deleteCategoryRepository = async (categoryId: string) => {
  // Vérifier si la catégorie est utilisée dans un produit
  const productsUsingCategory = await ProductModel.find({
    categories: { $in: [categoryId] },
  }).exec();

  if (productsUsingCategory.length > 0) {
    // Si la catégorie est associée à des produits, ne pas permettre la suppression
    throw new BadRequestError(
      `This category is used in one or more products and cannot be removed.`
    );
  }
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
    throw new NotFoundError(`Category with ID ${categoryId} not found`);
  }
  return deletedCategory;
};
