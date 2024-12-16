import express from "express";
import {
  createTag,
  deleteTag,
  updateTag,
} from "../../controllers/tag/tagController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createTag);
router.patch("/:tagId", verifyToken, updateTag);
router.delete("/:tagId", verifyToken, deleteTag);
export default router;
