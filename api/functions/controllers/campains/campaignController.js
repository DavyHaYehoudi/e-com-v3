import {
  createCampaignService,
  deleteCampaignService,
  getAllCampaignsService,
  getCampaignByIdService,
  sendCampaignService,
  updateCampaignService,
} from "../../services/campaign/campaignService.js";
import {
  createMarketingCampaignSchema,
  updateMarketingCampaignSchema,
} from "./entities/dto/campains.dto.js";
// ADMIN - Récupérer une campagne par son id
export const getCampaignById = async (req, res, next) => {
  try {
    const campaignId = req.params.campaignId;
    const campaign = await getCampaignByIdService(campaignId);
    res.json(campaign);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Récupérer toutes les campagnes
export const getAllCampaigns = async (req, res, next) => {
  try {
    const campaigns = await getAllCampaignsService();
    res.json(campaigns);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer une campagne (statut prepared toujours)
export const createCampaign = async (req, res, next) => {
  try {
    const validateFields = createMarketingCampaignSchema.parse(req.body);
    const newCampaign = await createCampaignService(validateFields);
    res.json(newCampaign);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Modifier une campagne ou l'envoyer
export const updateCampaign = async (req, res, next) => {
  try {
    const validateFields = updateMarketingCampaignSchema.parse(req.body);
    const campaignId = req.params.campaignId;
    const campaignToUpdate = await updateCampaignService(
      campaignId,
      validateFields
    );
    res.status(200).json(campaignToUpdate);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer une campagne
export const deleteCampaign = async (req, res, next) => {
  try {
    const campaignId = req.params.campaignId;
    await deleteCampaignService(campaignId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
