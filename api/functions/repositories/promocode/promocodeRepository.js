import {
  MongooseDuplicateError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import { Promocode } from "../../models/promocode/promocode.schema.js";
import { isAfter, isBefore, parseISO } from "date-fns";
export const getAllPromocodesRepository = async () => {
  try {
    return await Promocode.find();
  } catch (error) {
    throw new Error(`Error retrieving promo codes: ${error.message}`);
  }
};
export const createPromocodeRepository = async (data) => {
  const { code, promocodePercentage, startDate, endDate } = data;
  try {
    return await Promocode.create({
      code,
      promocodePercentage,
      startDate,
      endDate,
    });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB Duplicate Key Error
      throw new MongooseDuplicateError(
        `A promocode with the code "${data.code}" already exists.`
      );
    }
    throw new Error(`Error creating promocode : ${error.message}`);
  }
};
export const deletePromocodeRepository = async (promocodeId) => {
  try {
    const deletedPromocode = await Promocode.findByIdAndDelete(promocodeId);
    return deletedPromocode;
  } catch (error) {
    throw new NotFoundError(`Code Promo with ID ${promocodeId} not found`);
  }
};
export const checkPromocodeRepository = async (code) => {
  try {
    const promocode = await Promocode.findOne({ code });
    if (!promocode) {
      throw new Error(`Promo code not found with this code ${code}`);
    }
    // Conversion des dates en objets Date
    const startDate = parseISO(promocode.startDate.toString());
    const endDate = parseISO(promocode.endDate.toString());
    const currentDate = new Date();
    // Vérification des dates
    if (isBefore(currentDate, startDate)) {
      throw new Error(`Code promo '${code}' is not yet active.`);
    }
    if (isAfter(currentDate, endDate)) {
      throw new Error(`Code promo '${code}' expired.`);
    }
    return promocode;
  } catch (error) {
    throw new NotFoundError(`Code promo '${code}' invalid or expired`);
  }
};
