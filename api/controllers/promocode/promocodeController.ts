import { Request, Response, NextFunction } from "express";
import {
    checkPromocodeService,
  createPromocodeService,
  deletePromcodeService,
  getAllPromocodesService,
} from "../../services/promocode/promocodeService.js";
import { createPromocodeSchema } from "./entities/dto/promocode.dto.js";


// PUBLIC - Vérifier un promcode
export const checkPromocode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.body.code;
    const promocode = await checkPromocodeService(code);
    res.json(promocode);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Récupérer tous les promocodes
export const getAllPromocodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const promcodes = await getAllPromocodesService();
    res.json(promcodes);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Créer un nouveau promocode
export const createPromocode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const promocodeData = createPromocodeSchema.parse(req.body);
    const newPromocode = await createPromocodeService(promocodeData);
    res.status(201).json(newPromocode);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ADMIN - Supprimer un promocode
export const deletePromocode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const promocodeId = req.params.promocodeId;
    await deletePromcodeService(promocodeId);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

