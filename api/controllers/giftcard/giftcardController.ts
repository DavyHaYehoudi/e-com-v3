import { Request, Response, NextFunction } from "express";
import { createAdminGiftCardSchema } from "./entities/dto/giftcard.dto.js";
import {
  createAdminGiftcardService,
  deleteGiftcardService,
  getAllGiftcardsService,
  getCustomerGiftcardsService,
  giftcardCheckService,
} from "../../services/giftcard/giftcardService.js";
import { CustomJwtPayload } from "../../middlewares/authMiddleware";

// PUBLIC
export const giftcardCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.body;
    const giftcardChecked = await giftcardCheckService(code);
    res.status(200).json(giftcardChecked);
  } catch (error) {
    next(error);
  }
};
// CUSTOMER - Récupérer pour un customer toutes ses cartes cadeaux
export const getCustomerGiftcards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const giftcards = await getCustomerGiftcardsService(customerId);
    res.status(200).json(giftcards);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Récupérer toutes les cartes cadeaux
export const getAllGiftcards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const giftcards = await getAllGiftcardsService();
    res.json(giftcards);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer une carte cadeau
export const createAdminGiftcard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const giftcardData = createAdminGiftCardSchema.parse(req.body);
    const newGiftcard = await createAdminGiftcardService(giftcardData);
    res.status(201).json(newGiftcard);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer une carte cadeau
export const deleteGiftcard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const giftcardId = req.params.giftcardId;
    await deleteGiftcardService(giftcardId);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
