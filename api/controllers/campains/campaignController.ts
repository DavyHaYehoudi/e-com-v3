import { Request, Response, NextFunction } from "express";
import {
  createCampaignService,
  deleteCampaignService,
  getAllCampaignsService,
  updateCampaignService,
} from "../../services/campaign/campaignService.js";
import {
  createMarketingCampaignSchema,
  updateMarketingCampaignSchema,
} from "./entities/dto/campains.dto.js";

// ADMIN - Récupérer toutes les campagnes
export const getAllCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaigns = await getAllCampaignsService();
    res.json(campaigns);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer une campagne (statut prepared toujours)
export const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateFields = createMarketingCampaignSchema.parse(req.body);
    const newCampaign = await createCampaignService(validateFields);
    res.json(newCampaign);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Mettre à jour une campagne ou l'envoyer
export const updateCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateFields = updateMarketingCampaignSchema.parse(req.body);
    const campaignId = req.params.campaignId;
    await updateCampaignService(campaignId, validateFields);
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer une campagne
export const deleteCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaignId = req.params.campaignId;
    await deleteCampaignService(campaignId);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
