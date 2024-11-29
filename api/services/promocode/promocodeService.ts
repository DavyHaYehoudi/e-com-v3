import { CreateCodePromoDTO } from "../../controllers/promocode/entities/dto/promocode.dto.js";
import {
  checkPromocodeRepository,
  createPromocodeRepository,
  deletePromocodeRepository,
  getAllPromocodesRepository,
} from "../../repositories/promocode/promocodeRepository.js";

export const getAllPromocodesService = async () => {
  return await getAllPromocodesRepository();
};
export const createPromocodeService = async (data: CreateCodePromoDTO) => {
  return await createPromocodeRepository(data);
};
export const deletePromcodeService = async (categoryId: string) => {
  return await deletePromocodeRepository(categoryId);
};
export const checkPromocodeService = async (code: string) => {
  return await checkPromocodeRepository(code);
};
