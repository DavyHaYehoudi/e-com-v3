import express from "express";
import { checkPromocode } from "../../controllers/promocode/promocodeController.js";

const router = express.Router();

router.post("/verify-code", checkPromocode);
export default router;
