import { CreateAdminGiftcardInput } from "../../controllers/giftcard/entities/dto/giftcard.dto.js";
import {
  createAdminGiftcardRepository,
  createGiftcardWhenOrderRepository,
  deleteGiftcardRepository,
  getAllGiftcardsRepository,
  getCustomerGiftcardsRepository,
  getGiftcardByIdRepository,
  giftcardCheckRepository,
  updateGiftcardBalanceRepository,
} from "../../repositories/giftcard/giftcardRepository.js";

// PUBLIC
export const giftcardCheckService = async (code: string) => {
  return await giftcardCheckRepository(code);
};
// CUSTOMER
export const getCustomerGiftcardsService = async (customerId: string) => {
  return await getCustomerGiftcardsRepository(customerId);
};
export const createGiftcardWhenOrderService = async (
  firstHolderId: string,
  initialValue: number
) => {
  return await createGiftcardWhenOrderRepository(firstHolderId, initialValue);
};
export const updateGiftcardBalanceService = async (
  giftcardId: string,
  amountToUse: number,
  customerId: string
) => {
  return await updateGiftcardBalanceRepository(
    giftcardId,
    amountToUse,
    customerId
  );
};
// ADMIN
export const getAllGiftcardsService = async (customerId?: string) => {
  if (customerId) {
    return await getCustomerGiftcardsRepository(customerId);
  }
  return await getAllGiftcardsRepository();
};
// ADMIN - Récupérer une carte cadeau
export const getGiftcardByIdService = async (giftcardId: string) => {
  return await getGiftcardByIdRepository(giftcardId);
};
// ADMIN
export const createAdminGiftcardService = async (
  data: CreateAdminGiftcardInput
) => {
  return await createAdminGiftcardRepository(data);
};
// ADMIN
export const deleteGiftcardService = async (giftcardId: string) => {
  await deleteGiftcardRepository(giftcardId);
};
