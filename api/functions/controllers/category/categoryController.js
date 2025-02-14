import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  updateCategoryService,
} from "../../services/category/categoryService.js";
import { createCategorySchema } from "./entities/dto/category.dto.js";
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesService();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer une nouvelle catégorie
export const createCategory = async (req, res, next) => {
  try {
    const categoryData = createCategorySchema.parse(req.body);
    const newCategory = await createCategoryService(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// Update une catégorie
export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryData = createCategorySchema.parse(req.body);
    const updatedCategory = await updateCategoryService(
      categoryId,
      categoryData
    );
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer une catégorie
export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    await deleteCategoryService(categoryId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};