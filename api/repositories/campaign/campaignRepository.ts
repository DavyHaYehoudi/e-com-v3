import {
  ForbiddenError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import {
  CreateMarketingCampaignDTO,
  UpdateMarketingCampaignDTO,
} from "../../controllers/campains/entities/dto/campains.dto";
import { CampaignModel } from "../../models/campaign/campaign.schema.js";

export const getAllCampaignsRepository = async () => {
  return CampaignModel.find().lean(); // Utilise lean() pour un retour d'objet simple
};
export const createCampaignRepository = async (
  campaignData: CreateMarketingCampaignDTO
) => {
  return CampaignModel.create({
    subject: campaignData.subject,
    content: campaignData.content,
  });
};
export const updateCampaignRepository = async (
  campaignId: string,
  campaignData: UpdateMarketingCampaignDTO
) => {
  const campaign = await CampaignModel.findById(campaignId);

  if (!campaign) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }

  // Vérifier que la campagne n'a pas déjà été envoyée
  if (campaign.status === "sent") {
    throw new ForbiddenError(
      "Cannot update a campaign that has already been sent."
    );
  }

  // Mettre à jour les champs
  campaign.subject = campaignData.subject || campaign.subject;
  campaign.content = campaignData.content || campaign.content;
  campaign.status = campaignData.status || campaign.status;

  if (campaign.status === "sent") {
    campaign.sendDate = new Date(); // Ajoute la date d'envoi
    campaign.recipients = campaignData.emails || [];
    campaign.totalSent = campaignData.emails.length; // Calcul le total envoyé
  }

  await CampaignModel.updateOne({ _id: campaignId }, campaign.toObject());
  return campaign;
};
export const deleteCampaignRepository = async (campaignId: string) => {
  const result = await CampaignModel.deleteOne({ _id: campaignId });

  if (result.deletedCount === 0) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }
};
