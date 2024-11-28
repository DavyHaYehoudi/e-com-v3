import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  getCashbackHistoryCustomerFromAdmin,
  getCustomerFromAdmin,
  getCustomersFromAdmin,
  updateCashbackCustomer,
  updateCustomerFromAdmin,
} from "../../controllers/customer/customerController.js";

const router = Router();

// customer
router.get("/", verifyToken, getCustomersFromAdmin);
router.get("/:customerId", verifyToken, getCustomerFromAdmin);
router.patch("/:customerId", verifyToken, updateCustomerFromAdmin);
router.get("/cashback/:customerId", verifyToken, getCashbackHistoryCustomerFromAdmin);
router.patch("/cashback/:customerId", verifyToken, updateCashbackCustomer);

export default router;
