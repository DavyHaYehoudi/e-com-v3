import { CreateAdminGiftcardInput } from "../../controllers/giftcard/entities/dto/giftcard.dto.js";
import {
  createAdminGiftcardRepository,
  deleteGiftcardRepository,
  getAllGiftcardsRepository,
  getCustomerGiftcardsRepository,
  giftcardCheckRepository,
} from "../../repositories/giftcard/giftcardRepository.js";

// PUBLIC
export const giftcardCheckService = async (code: string) => {
  return await giftcardCheckRepository(code);
};
// CUSTOMER
export const getCustomerGiftcardsService = async (customerId: string) => {
  return await getCustomerGiftcardsRepository(customerId);
};
// ADMIN
export const getAllGiftcardsService = async () => {
  return await getAllGiftcardsRepository();
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
