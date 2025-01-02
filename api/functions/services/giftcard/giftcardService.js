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
export const giftcardCheckService = async (code) => {
  return await giftcardCheckRepository(code);
};
// CUSTOMER
export const getCustomerGiftcardsService = async (customerId) => {
  return await getCustomerGiftcardsRepository(customerId);
};
export const createGiftcardWhenOrderService = async (
  firstHolderId,
  initialValue
) => {
  return await createGiftcardWhenOrderRepository(firstHolderId, initialValue);
};
export const updateGiftcardBalanceService = async (
  giftcardId,
  amountToUse,
  customerId
) => {
  return await updateGiftcardBalanceRepository(
    giftcardId,
    amountToUse,
    customerId
  );
};
// ADMIN
export const getAllGiftcardsService = async (customerId) => {
  if (customerId) {
    return await getCustomerGiftcardsRepository(customerId);
  }
  return await getAllGiftcardsRepository();
};
// ADMIN - Récupérer une carte cadeau
export const getGiftcardByIdService = async (giftcardId) => {
  return await getGiftcardByIdRepository(giftcardId);
};
// ADMIN
export const createAdminGiftcardService = async (data) => {
  return await createAdminGiftcardRepository(data);
};
// ADMIN
export const deleteGiftcardService = async (giftcardId) => {
  await deleteGiftcardRepository(giftcardId);
};
