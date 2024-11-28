import { CreateCategoryDTO } from "../../controllers/category/entities/dto/category.dto.js";
import Category from "../../models/category/category.schema.js";

export const getAllCategoriesRepository = async () => {
  try {
    return await Category.find();
  } catch (error: any) {
    throw new Error(
      `Erreur lors de la récupération des catégories : ${error.message}`
    );
  }
};

export const createCategoryRepository = async (data: CreateCategoryDTO) => {
  try {
    return await Category.create({ label: data.label });
  } catch (error: any) {
    throw new Error(
      `Erreur lors de la création de la catégorie : ${error.message}`
    );
  }
};
export const deleteCategoryRepository = async (categoryId: string) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new Error("Catégorie introuvable.");
    }
    return deletedCategory;
  } catch (error: any) {
    throw new Error(
      `Erreur lors de la suppression de la catégorie : ${error.message}`
    );
  }
};
