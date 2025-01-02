import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  getOrderCustomerById,
  getOrdersCustomer,
} from "../../controllers/order/orderController.js";
const router = Router();
// orders
router.get("/", verifyToken, getOrdersCustomer);
router.get("/:orderId", verifyToken, getOrderCustomerById);
export default router;
