import { Router } from "express";
import { getPaymentAmountVisitor } from "../../controllers/paymentStatus/payment/paymentController.js";
const router = Router();

// paymentAmount
router.post("/amount", getPaymentAmountVisitor);

export default router;
