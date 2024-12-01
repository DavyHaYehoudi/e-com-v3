import { Router } from "express";
import { getPaymentAmountVisitor } from "../../controllers/payment/paymentController.js";
const router = Router();

// paymentAmount
router.post("/amount", getPaymentAmountVisitor);

export default router;
