import { Request, Response, NextFunction } from "express";
import { createTagSchema } from "./entities/dto/tag.dto.js";
import {
  createTagService,
  deleteTagService,
  getAllTagsService,
  updateTagService,
} from "../../services/tag/tagService.js";

// Récupérer tous les tags
export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await getAllTagsService();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Créer un nouveau tag
export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagData = createTagSchema.parse(req.body);
    const newTag = await createTagService(tagData);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Modifier un tag
export const updateTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagId = req.params.tagId;
    const tagData = createTagSchema.parse(req.body);
    const updatedTag = await updateTagService(tagId, tagData);
    res.json(updatedTag);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Supprimer un tag
export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagId = req.params.tagId;
    await deleteTagService(tagId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
