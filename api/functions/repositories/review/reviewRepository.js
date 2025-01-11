import {
  BadRequestError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import Review from "../../models/review/review.schema.js";
// PUBLIC
export const getReviewsOfOneProductRepository = async (productId) => {
  try {
    return await Review.find({ productId, status: "approved" })
      .populate({
        path: "customerId",
        select: "firstName lastName avatarUrl",
      })
      .sort({ createdAt: -1 }); // Trie par date décroissante
  } catch (error) {
    throw new Error(
      `Error retrieving reviews of one product: ${error.message}`
    );
  }
};

// ADMIN
export const getAllReviewsRepository = async () => {
  try {
    return await Review.find().sort({ createdAt: -1 }); // Trie par date décroissante (les plus récentes en premier);
  } catch (error) {
    throw new Error(`Error retrieving reviews : ${error.message}`);
  }
};
// AMDIN
export const getReviewRepository = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new NotFoundError(`Review with ID ${reviewId} not found`);
  }
  return review;
};
// ADMIN
export const approveReviewRepository = async (reviewId, status) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new NotFoundError(`Review with ID ${reviewId} not found`);
  }
  await Review.findByIdAndUpdate(reviewId, { status });
};
// CUSTOMER
export const createReviewRepository = async (customerId, reviewData) => {
  const existingReview = await Review.findOne({
    customerId,
    productId: reviewData.productId,
  });
  if (existingReview) {
    throw new BadRequestError("Already left a review for this product.");
  }
  return await Review.create(Object.assign({ customerId }, reviewData));
};
// ADMIN
export const deleteReviewRepository = async (reviewId) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    return deletedReview;
  } catch (error) {
    throw new NotFoundError(`Review with ID ${reviewId} not found`);
  }
};
