import { Router } from "express";
import {
  approveReview,
  getAllReviews,
} from "../../controllers/review/reviewController.js";

const router = Router();

// review
router.patch("/:reviewId", approveReview);
router.get("/", getAllReviews);

export default router;
