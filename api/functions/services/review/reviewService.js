import {
  approveReviewRepository,
  deleteReviewRepository,
  getAllReviewsRepository,
  getReviewRepository,
  getReviewsOfOneProductRepository,
  createReviewRepository,
} from "../../repositories/review/reviewRepository.js";
// PUBLIC
export const getReviewsOfOneProductService = async (productId) => {
  return await getReviewsOfOneProductRepository(productId);
};
// ADMIN
export const getAllReviewsService = async () => {
  return await getAllReviewsRepository();
};
// ADMIN
export const getReviewService = async (reviewId) => {
  return await getReviewRepository(reviewId);
};
// ADMIN
export const approveReviewService = async (reviewId, status) => {
  return await approveReviewRepository(reviewId, status);
};
// CUSTOMER
export const createReviewService = async (customerId, reviewData) => {
  return await createReviewRepository(customerId, reviewData);
};
// ADMIN
export const deleteReviewService = async (reviewId) => {
  return await deleteReviewRepository(reviewId);
};
