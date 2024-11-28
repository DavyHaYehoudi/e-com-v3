import { CreateCategoryDTO } from "../../controllers/category/entities/dto/category.dto.js";
import {
  createCategoryRepository,
  deleteCategoryRepository,
  getAllCategoriesRepository,
} from "../../repositories/category/categoryRepository.js";

export const getAllCategoriesService = async () => {
  return await getAllCategoriesRepository();
};
export const createCategoryService = async (
  label: CreateCategoryDTO,
) => {
  return await createCategoryRepository(label);
};
export const deleteCategoryService = async (categoryId: string) => {
  return await deleteCategoryRepository(categoryId);
};
