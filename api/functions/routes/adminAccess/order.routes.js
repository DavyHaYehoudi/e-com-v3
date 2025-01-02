import { Router } from "express";
import {
  deleteOrderById,
  getAllOrders,
  getOrderCustomerByIdFromAdmin,
  getOrdersCustomerFromAdmin,
  updateOrderById,
} from "../../controllers/order/orderController.js";
const router = Router();
// orders
router.get("/", getAllOrders);
router.get("/customer/:customerId", getOrdersCustomerFromAdmin);
router.get("/:orderId", getOrderCustomerByIdFromAdmin);
router.patch("/:orderId", updateOrderById);
router.delete("/:orderId", deleteOrderById);
export default router;
