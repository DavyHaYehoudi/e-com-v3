import express from "express";
import { getAllCollections } from "../../controllers/collection/collectionController.js";
const router = express.Router();
router.get("/", getAllCollections);
export default router;
