import {
  createCollectionService,
  deleteCollectionService,
  getAllCollectionsService,
  updateCollectionService,
} from "../../services/collection/collectionService.js";
import { createCollectionSchema } from "./entities/dto/collection.dto.js";
export const getAllCollections = async (req, res, next) => {
  try {
    const collections = await getAllCollectionsService();
    res.json(collections);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer une nouvelle collection
export const createCollection = async (req, res, next) => {
  try {
    const collectionData = createCollectionSchema.parse(req.body);
    const newCollection = await createCollectionService(collectionData);
    res.status(201).json(newCollection);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// Update une collection
export const updateCollection = async (req, res, next) => {
  try {
    const collectionId = req.params.collectionId;
    const categoryData = createCollectionSchema.parse(req.body);
    const updatedCollection = await updateCollectionService(
      collectionId,
      categoryData
    );
    res.json(updatedCollection);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer une collection
export const deleteCollection = async (req, res, next) => {
  try {
    const collectionId = req.params.collectionId;
    await deleteCollectionService(collectionId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};