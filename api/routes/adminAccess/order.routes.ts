import { Router } from "express";
import {
  getAllOrders,
  getOrderCustomerByIdFromAdmin,
  getOrdersCustomerFromAdmin,
} from "../../controllers/order/orderController.js";

const router = Router();

// orders
router.get("/", getAllOrders);
router.get("/customer/:customerId", getOrdersCustomerFromAdmin);
router.get("/:orderId", getOrderCustomerByIdFromAdmin);

export default router;
