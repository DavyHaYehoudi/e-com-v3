import {
  UpdateReviewCustomerDTO,
  CreateReviewDTO,
} from "../../controllers/review/entities/dto/review.dto.js";
import {
  approveReviewRepository,
  deleteReviewRepository,
  getAllReviewsRepository,
  getReviewRepository,
  getReviewsOfOneProductRepository,
  updateReviewRepository,
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
  toggleValidate: boolean
) => {
  return await approveReviewRepository(reviewId, toggleValidate);
};
// CUSTOMER
export const createReviewService = async (
  customerId: string,
  reviewData: CreateReviewDTO
) => {
  return await createReviewRepository(customerId, reviewData);
};
// CUSTOMER
export const updateReviewService = async (
  customerId: string,
  reviewId: string,
  updatedFields: UpdateReviewCustomerDTO
) => {
  return await updateReviewRepository(customerId, reviewId, updatedFields);
};
// CUSTOMER
export const deleteReviewService = async (
  customerId: string,
  reviewId: string
) => {
  return await deleteReviewRepository(customerId, reviewId);
};
