import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  createCollection,
  deleteCollection,
  updateCollection,
} from "../../controllers/collection/collectionController.js";

const router = express.Router();

router.post("/", verifyToken, createCollection);
router.patch("/:collectionId", verifyToken, updateCollection);
router.delete("/:collectionId", verifyToken, deleteCollection);
export default router;
