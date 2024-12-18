import { CreateReviewDTO } from "../../controllers/review/entities/dto/review.dto.js";
import {
  approveReviewRepository,
  deleteReviewRepository,
  getAllReviewsRepository,
  getReviewRepository,
  getReviewsOfOneProductRepository,
  createReviewRepository,
} from "../../repositories/review/reviewRepository.js";

// PUBLIC
export const getReviewsOfOneProductService = async (productId: string) => {
  return await getReviewsOfOneProductRepository(productId);
};
// ADMIN
export const getAllReviewsService = async () => {
  return await getAllReviewsRepository();
};
// ADMIN
export const getReviewService = async (reviewId: string) => {
  return await getReviewRepository(reviewId);
};
// ADMIN
export const approveReviewService = async (
  reviewId: string,
  status: string
) => {
  return await approveReviewRepository(reviewId, status);
};
// CUSTOMER
export const createReviewService = async (
  customerId: string,
  reviewData: CreateReviewDTO
) => {
  return await createReviewRepository(customerId, reviewData);
};

// ADMIN
export const deleteReviewService = async (reviewId: string) => {
  return await deleteReviewRepository(reviewId);
};
