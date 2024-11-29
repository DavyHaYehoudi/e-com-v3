import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  createReview,
  deleteReview,
  getReview,
  updateReview,
} from "../../controllers/review/reviewController.js";

const router = Router();

// review
router.get("/:reviewId", verifyToken, getReview);
router.post("/", verifyToken, createReview);
router.patch("/:reviewId", verifyToken, updateReview);
router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
