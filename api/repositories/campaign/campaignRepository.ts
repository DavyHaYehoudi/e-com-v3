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
export const sendCampaignRepository = async (
  campaignId: string,
  campaignData: UpdateMarketingCampaignDTO
) => {
  const campaign = await CampaignModel.findById(campaignId);

  if (!campaign) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }

  if (campaign.status === "sent") {
    throw new ForbiddenError(
      "Cannot update a campaign that has already been sent."
    );
  }

  // Mise à jour des champs nécessaires
  const updatedCampaignData = {
    status: "sent",
    sendDate: new Date(),
    recipients: campaignData.emails,
    totalSent: campaignData.emails.length,
  };

  const updatedCampaign = await CampaignModel.findByIdAndUpdate(
    campaignId,
    { $set: updatedCampaignData },
    { new: true }
  );

  return updatedCampaign;
};

export const deleteCampaignRepository = async (campaignId: string) => {
  const result = await CampaignModel.deleteOne({ _id: campaignId });

  if (result.deletedCount === 0) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }
};
