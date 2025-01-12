import { sendMarketingEmailToCustomer } from "../../email/subject/marketing.js";
import { BadRequestError } from "../../exceptions/CustomErrors.js";
import {
  createCampaignRepository,
  deleteCampaignRepository,
  getAllCampaignsRepository,
  getCampaignByIdRepository,
  sendCampaignRepository,
  updateCampaignRepository,
} from "../../repositories/campaign/campaignRepository.js";
import { getCustomersWithEmailMarketingConsentService } from "../customer/customerService.js";
// ADMIN - Récupérer une campagne par son id
export const getCampaignByIdService = async (campaignId) => {
  return await getCampaignByIdRepository(campaignId);
};
// ADMIN - Récupérer toutes les campagnes
export const getAllCampaignsService = async () => {
  return await getAllCampaignsRepository();
};
// ADMIN - Créer une campagne (statut prepared toujours)
export const createCampaignService = async (campaignData) => {
  const newCampaign = await createCampaignRepository(campaignData);
  return newCampaign;
};
// ADMIN - Modifier une campagne ou l'envoyer
export const updateCampaignService = async (campaignId, campaignData) => {
  if (campaignData.status === "sent" || campaignData.status === "prepared") {
    return await sendCampaignService(campaignId, campaignData);
  }
  const updatedCampaign = await updateCampaignRepository(
    campaignId,
    campaignData
  );
  return updatedCampaign;
};

// ADMIN - Envoyer une campagne
export const sendCampaignService = async (campaignId, campaignData) => {
  const campaignToSend = await sendCampaignRepository(campaignId, campaignData);
  if (!campaignToSend) {
    return;
  }
  const emailsFromFront = campaignData.emails;
  // Récupérer les clients avec consentement à recevoir des e-mails marketing
  const customersWithEmailMarketingConsentDB =
    await getCustomersWithEmailMarketingConsentService();
  if (customersWithEmailMarketingConsentDB.length === 0) {
    throw new BadRequestError(
      "Aucun client n'a accepté de recevoir des e-mails marketing."
    );
  }
  console.log(
    "customersWithEmailMarketingConsentDB:",
    customersWithEmailMarketingConsentDB
  );
  const filteredCustomers = customersWithEmailMarketingConsentDB.filter(
    (customer) => emailsFromFront.includes(customer.email)
  );
  for (const customer of filteredCustomers) {
    try {
      await sendMarketingEmailToCustomer(
        customer.email,
        campaignToSend.subject,
        customer.firstName,
        campaignToSend.content
      );
      console.log(`Email marketing envoyé à ${customer.email}`);
    } catch (error) {
      console.error(
        `Erreur lors de l'envoi de l'email marketing à ${customer.email}:`,
        error
      );
    }
  }
  return campaignToSend;
};
// ADMIN - Supprimer une campagne
export const deleteCampaignService = async (campaignId) => {
  await deleteCampaignRepository(campaignId);
};
