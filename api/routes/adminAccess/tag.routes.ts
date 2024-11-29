import express from "express";
import { createTag, deleteTag } from "../../controllers/tag/tagController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createTag);
router.delete("/:tagId", verifyToken, deleteTag);
export default router;
