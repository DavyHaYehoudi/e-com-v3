import { NotFoundError } from "../../exceptions/CustomErrors.js";
import Review from "../../models/review/review.schema.js";
import { CreateReviewDTO } from "../../controllers/review/entities/dto/review.dto.js";
import { UpdateReviewCustomerDTO } from "../../controllers/review/entities/dto/review.dto.js";

// PUBLIC
export const getReviewsOfOneProductRepository = async (productId: string) => {
  try {
    return await Review.find({ productId, isValidateByAdmin: true });
  } catch (error: any) {
    throw new Error(
      `Error retrieving reviews of one product: ${error.message}`
    );
  }
};
// ADMIN
export const getAllReviewsRepository = async () => {
  try {
    return await Review.find();
  } catch (error: any) {
    throw new Error(`Error retrieving reviews : ${error.message}`);
  }
};
// AMDIN
export const getReviewRepository = async (reviewId: string) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new NotFoundError(`Review with ID ${reviewId} not found`);
  }
  return review;
};
// ADMIN
export const approveReviewRepository = async (
  reviewId: string,
  toggleValidate: boolean
) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new NotFoundError(`Review with ID ${reviewId} not found`);
  }

  if (toggleValidate) {
    review.isValidateByAdmin = !review.isValidateByAdmin;
    await review.save();
  }
};
// CUSTOMER
export const createReviewRepository = async (
  customerId: string,
  reviewData: CreateReviewDTO
) => {
  return await Review.create({
    customerId,
    ...reviewData,
  });
};
// CUSTOMER
export const updateReviewRepository = async (
  customerId: string,
  reviewId: string,
  updatedFields: UpdateReviewCustomerDTO
) => {
  const review = await Review.findOneAndUpdate(
    { _id: reviewId, customerId, isValidateByAdmin: false },
    updatedFields,
    { new: true, runValidators: true } // Retourner le document mis à jour
  );

  if (!review) {
    throw new NotFoundError(
      `Review with ID ${reviewId} not found for customer ID ${customerId} or review already approved by admin`
    );
  }

  return review;
};
// CUSTOMER
export const deleteReviewRepository = async (
  customerId: string,
  reviewId: string
) => {
  const result = await Review.deleteOne({
    _id: reviewId,
    customerId,
    isValidateByAdmin: false,
  });

  if (result.deletedCount === 0) {
    throw new NotFoundError(
      `Review with ID ${reviewId} not found for customer ID ${customerId} or review already approved by admin`
    );
  }
};
