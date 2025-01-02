import { createAdminGiftCardSchema } from "./entities/dto/giftcard.dto.js";
import {
  createAdminGiftcardService,
  deleteGiftcardService,
  getAllGiftcardsService,
  getCustomerGiftcardsService,
  getGiftcardByIdService,
  giftcardCheckService,
} from "../../services/giftcard/giftcardService.js";
// PUBLIC
export const giftcardCheck = async (req, res, next) => {
  try {
    const { code } = req.body;
    const giftcardChecked = await giftcardCheckService(code);
    res.status(200).json(giftcardChecked);
  } catch (error) {
    next(error);
  }
};
// CUSTOMER - Récupérer pour un customer toutes ses cartes cadeaux
export const getCustomerGiftcards = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const giftcards = await getCustomerGiftcardsService(customerId);
    res.status(200).json(giftcards);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Récupérer toutes les cartes cadeaux
export const getAllGiftcards = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    const giftcards = await getAllGiftcardsService(customerId);
    res.json(giftcards);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Récupérer une carte cadeau
export const getGiftcardById = async (req, res, next) => {
  try {
    const giftcardId = req.params.giftcardId;
    const giftcard = await getGiftcardByIdService(giftcardId);
    res.json(giftcard);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer une carte cadeau
export const createAdminGiftcard = async (req, res, next) => {
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
export const deleteGiftcard = async (req, res, next) => {
  try {
    const giftcardId = req.params.giftcardId;
    await deleteGiftcardService(giftcardId);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
