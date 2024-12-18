import { Router } from "express";
import {
  approveReview,
  deleteReview,
  getAllReviews,
} from "../../controllers/review/reviewController.js";

const router = Router();

// review
router.patch("/:reviewId", approveReview);
router.get("/", getAllReviews);
router.delete("/:reviewId", deleteReview);

export default router;
