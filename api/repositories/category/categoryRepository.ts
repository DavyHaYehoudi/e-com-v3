import { CreateCategoryDTO } from "../../controllers/category/entities/dto/category.dto.js";
import { MongooseDuplicateError, NotFoundError } from "../../exceptions/CustomErrors.js";
import Category from "../../models/category/category.schema.js";

export const getAllCategoriesRepository = async () => {
  // await Category.syncIndexes();

  try {
    return await Category.find();
  } catch (error: any) {
    throw new Error(
      `Error retrieving categories : ${error.message}`
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
    throw new Error(
      `Error creating category : ${error.message}`
    );
  }
};
export const deleteCategoryRepository = async (categoryId: string) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new NotFoundError(`Category with ID ${categoryId} not found`);
    }
    return deletedCategory;
  } catch (error: any) {
    throw new Error(
      `Error deleting category : ${error.message}`
    );
  }
};
