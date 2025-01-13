import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { CampaignModel } from "../../models/campaign/campaign.schema.js";

// ADMIN - Récupérer une campagne par son id
export const getCampaignByIdRepository = async (campaignId) => {
  const campaign = await CampaignModel.findById(campaignId).lean(); // Utilise lean() pour un retour d'objet simple
  if (!campaign) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }
  return campaign;
};
export const getAllCampaignsRepository = async () => {
  return CampaignModel.find().lean(); // Utilise lean() pour un retour d'objet simple
};
export const createCampaignRepository = async (campaignData) => {
  return CampaignModel.create({
    subject: campaignData.subject,
    content: campaignData.content,
    imageUrl: campaignData.imageUrl,
    linkCTA: campaignData.linkCTA,
  });
};
// ADMIN - Modifier une campagne ou l'envoyer
export const updateCampaignRepository = async (campaignId, campaignData) => {
  const campaign = await CampaignModel.findById(campaignId);
  if (!campaign) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }
  // Mise à jour des champs nécessaires
  const updatedCampaignData = {
    subject: campaignData.subject,
    content: campaignData.content,
    imageUrl: campaignData.imageUrl,
    status: campaignData.status,
    linkCTA: campaignData.linkCTA,
  };
  const updatedCampaign = await CampaignModel.findByIdAndUpdate(
    campaignId,
    { $set: updatedCampaignData },
    { new: true }
  );
  return updatedCampaign;
};
export const sendCampaignRepository = async (campaignId, campaignData) => {
  const campaign = await CampaignModel.findById(campaignId);
  if (!campaign) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }
  // Mise à jour des champs nécessaires
  const updatedCampaignData = {
    status: campaignData.status,
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
export const deleteCampaignRepository = async (campaignId) => {
  const result = await CampaignModel.deleteOne({ _id: campaignId });
  if (result.deletedCount === 0) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }
};
