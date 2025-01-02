import {
  getAllReviewsService,
  getReviewsOfOneProductService,
  createReviewService,
  approveReviewService,
  deleteReviewService,
} from "../../services/review/reviewService.js";
import { createReviewSchema } from "./entities/dto/review.dto.js";
// Récupérer tous les commentaires
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await getAllReviewsService();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
// Récupérer tous les commentaires d'un produit
export const getReviewsOfOneProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const reviews = await getReviewsOfOneProductService(productId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
// Créer un nouveau commentaire
export const createReview = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const reviewData = createReviewSchema.parse(req.body);
    const newReview = await createReviewService(customerId, reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Approuver un commentaire
export const approveReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const status = req.body.status;
    await approveReviewService(reviewId, status);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer un commentaire
export const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    await deleteReviewService(reviewId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
