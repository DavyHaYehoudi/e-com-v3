import {
  BadRequestError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import Review from "../../models/review/review.schema.js";
import { CreateReviewDTO } from "../../controllers/review/entities/dto/review.dto.js";

// PUBLIC
export const getReviewsOfOneProductRepository = async (productId: string) => {
  try {
    return await Review.find({ productId, status: "approved" }).sort({
      createdAt: -1,
    }); // Trie par date décroissante (les plus récentes en premier);
  } catch (error: any) {
    throw new Error(
      `Error retrieving reviews of one product: ${error.message}`
    );
  }
};
// ADMIN
export const getAllReviewsRepository = async () => {
  try {
    return await Review.find().sort({ createdAt: -1 }); // Trie par date décroissante (les plus récentes en premier);
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
  status: string
) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new NotFoundError(`Review with ID ${reviewId} not found`);
  }

  await Review.findByIdAndUpdate(reviewId, { status });
};
// CUSTOMER
export const createReviewRepository = async (
  customerId: string,
  reviewData: CreateReviewDTO
) => {
  const existingReview = await Review.findOne({
    customerId,
    productId: reviewData.productId,
  });

  if (existingReview) {
    throw new BadRequestError("Already left a review for this product.");
  }

  return await Review.create({
    customerId,
    ...reviewData,
  });
};

// ADMIN
export const deleteReviewRepository = async (reviewId: string) => {
  const result = await Review.deleteOne({
    _id: reviewId,
    status: "pending",
  });

  if (result.deletedCount === 0) {
    throw new NotFoundError(
      `Review with ID ${reviewId} not found or review already approved by admin`
    );
  }
};
