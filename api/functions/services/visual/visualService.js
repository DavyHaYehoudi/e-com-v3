import {
  findByPageVisualRepository,
  updateByPageVisualRepository,
} from "../../repositories/visual/visualRepository.js";

export const getVisualsByPageService = async (page) => {
  return await findByPageVisualRepository(page);
};

export const updateVisualsByPageService = async (page, images) => {
  return await updateByPageVisualRepository(page, images);
};
