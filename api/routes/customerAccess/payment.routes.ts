import { Router } from "express";
import { getPaymentAmountCustomer } from "../../controllers/payment/paymentController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
const router = Router();

// paymentAmount
router.post("/customer/amount", verifyToken, getPaymentAmountCustomer);

export default router;
