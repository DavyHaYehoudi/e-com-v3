import {
  checkPromocodeRepository,
  createPromocodeRepository,
  deletePromocodeRepository,
  getAllPromocodesRepository,
} from "../../repositories/promocode/promocodeRepository.js";
export const getAllPromocodesService = async () => {
  return await getAllPromocodesRepository();
};
export const createPromocodeService = async (data) => {
  return await createPromocodeRepository(data);
};
export const deletePromcodeService = async (categoryId) => {
  return await deletePromocodeRepository(categoryId);
};
export const checkPromocodeService = async (code) => {
  return await checkPromocodeRepository(code);
};
