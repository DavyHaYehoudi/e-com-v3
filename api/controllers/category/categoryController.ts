import { Request, Response, NextFunction } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
} from "../../services/category/categoryService.js";
import { createCategorySchema } from "./entities/dto/category.dto.js";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategoriesService();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer une nouvelle catégorie
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = createCategorySchema.parse(req.body);
    const newCategory = await createCategoryService(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer une catégorie
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.categoryId;
    await deleteCategoryService(categoryId);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
