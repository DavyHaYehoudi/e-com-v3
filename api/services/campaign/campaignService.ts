import {
  CreateMarketingCampaignDTO,
  UpdateMarketingCampaignDTO,
} from "../../controllers/campains/entities/dto/campains.dto.js";
import { sendMarketingEmailToCustomer } from "../../email/subject/marketing.js";
import { BadRequestError } from "../../exceptions/CustomErrors.js";
import {
  createCampaignRepository,
  deleteCampaignRepository,
  getAllCampaignsRepository,
  updateCampaignRepository,
} from "../../repositories/campaign/campaignRepository.js";
import { getCustomersWithEmailMarketingConsentService } from "../customer/customerService.js";

// ADMIN - Récupérer toutes les campagnes
export const getAllCampaignsService = async () => {
  return await getAllCampaignsRepository();
};
// ADMIN - Créer une campagne (statut prepared toujours)
export const createCampaignService = async (
  campaignData: CreateMarketingCampaignDTO
) => {
  const newCampaign = await createCampaignRepository(campaignData);
  return newCampaign;
};
// ADMIN - Mettre à jour une campagne ou l'envoyer
export const updateCampaignService = async (
  campaignId: string,
  campaignData: UpdateMarketingCampaignDTO
) => {
  await updateCampaignRepository(campaignId, campaignData);
  if (
    campaignData.status === "sent" &&
    campaignData.emails &&
    campaignData.emails.length > 0
  ) {
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
          campaignData.subject,
          customer.firstName,
          campaignData.content
        );
        console.log(`Email marketing envoyé à ${customer.email}`);
      } catch (error) {
        console.error(
          `Erreur lors de l'envoi de l'email marketing à ${customer.email}:`,
          error
        );
      }
    }
  }
};
// ADMIN - Supprimer une campagne
export const deleteCampaignService = async (campaignId: string) => {
  await deleteCampaignRepository(campaignId);
};
