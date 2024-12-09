import Customer from "../../models/customer/customer.schema.js";
import {
  GiftCardDocument,
  GiftCardModel,
} from "../../models/giftcard/giftcard.schema.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import { CreateAdminGiftcardInput } from "../../controllers/giftcard/entities/dto/giftcard.dto.js";

// PUBLIC
export const giftcardCheckRepository = async (code: string) => {
  return await GiftCardModel.findOne({
    code,
    expirationDate: { $lt: new Date() }, // Pour vérifier si la date d'expiration est dans le futur
  }).select("balance code"); // Sélectionne uniquement les champs balance et code
};

// CUSTOMER
export const getCustomerGiftcardsRepository = async (customerId: string) => {
  try {
    const giftcards = await GiftCardModel.find({
      $or: [
        { firstHolderId: customerId }, // Vérifie si le customer est le détenteur initial
        { "usageHistory.usedByCustomerId": customerId }, // Vérifie si le customer a utilisé la carte
      ],
    });

    return giftcards;
  } catch (error) {
    throw new BadRequestError(`BadRequestError : ${error}`);
  }
};
// CUSTOMER
export const createGiftcardWhenOrderRepository = async (
  firstHolderId: string,
  initialValue: number
) => {
  // Vérifier si le client existe
  const customer = await Customer.findById(firstHolderId);
  if (!customer) {
    throw new NotFoundError(`Customer with ID ${firstHolderId} not found`);
  }

  // Créer une nouvelle gift card
  return await GiftCardModel.create({
    firstHolderId,
    initialValue,
    balance: initialValue, // Le solde initial est égal à la valeur initiale
    isIssuedByAdmin: false,
    buyOrderId: firstHolderId,
    usageHistory: [], // Historique vide par défaut
  });
};
// CUSTOMER
export const updateGiftcardBalanceRepository = async (
  giftcardId: string,
  amountToUse: number
) => {
  try {
    const giftcardToUpdate = await GiftCardModel.findById(giftcardId);

    if (!giftcardToUpdate) {
      throw new NotFoundError(`Giftcard with ID ${giftcardId} not found`);
    }
    const { balance } = giftcardToUpdate;
    // Calcul de la nouvelle balance
    const newBalance = balance - amountToUse;

    // Vérifier si le solde est inférieur à zéro
    if (newBalance < 0) {
      throw new BadRequestError("Not enough balance");
    }
    return (await GiftCardModel.findByIdAndUpdate(
      giftcardId,
      { balance: newBalance },
      { new: true }
    )) as GiftCardDocument;
  } catch (error: any) {
    throw new BadRequestError(`BadRequestError : ${error}`);
  }
};
// ADMIN
export const getAllGiftcardsRepository = async () => {
  return await GiftCardModel.find();
};
// ADMIN
export const createAdminGiftcardRepository = async (
  data: CreateAdminGiftcardInput
) => {
  const { firstHolderId, initialValue, expirationDate } = data;

  // Vérifier si le client existe
  const customer = await Customer.findById(firstHolderId);
  if (!customer) {
    throw new NotFoundError(`Customer with ID ${firstHolderId} not found`);
  }

  // Créer une nouvelle gift card
  return await GiftCardModel.create({
    firstHolderId,
    initialValue,
    balance: initialValue, // Le solde initial est égal à la valeur initiale
    expirationDate,
    isIssuedByAdmin: true,
    buyOrderId: null,
    usageHistory: [], // Historique vide par défaut
  });
};
// ADMIN
export const deleteGiftcardRepository = async (giftcardId: string) => {
  try {
    const deletedGiftcard = await GiftCardModel.findByIdAndDelete(giftcardId);
    return deletedGiftcard;
  } catch (error: any) {
    throw new NotFoundError(`Giftcard with ID ${giftcardId} not found`);
  }
};
