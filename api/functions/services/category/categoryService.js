import {
  createCategoryRepository,
  deleteCategoryRepository,
  getAllCategoriesRepository,
  updateCategoryRepository,
} from "../../repositories/category/categoryRepository.js";
export const getAllCategoriesService = async () => {
  return await getAllCategoriesRepository();
};
export const createCategoryService = async (label) => {
  return await createCategoryRepository(label);
};
// Update une catégorie
export const updateCategoryService = async (categoryId, label) => {
  return await updateCategoryRepository(categoryId, label);
};
export const deleteCategoryService = async (categoryId) => {
  return await deleteCategoryRepository(categoryId);
};
