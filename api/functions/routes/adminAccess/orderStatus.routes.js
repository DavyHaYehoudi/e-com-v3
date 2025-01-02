import { Router } from "express";
import {
  getAllOrderStatuses,
  orderStatus,
} from "../../controllers/orderStatus/orderStatusController.js";
const router = Router();
// orderStatus
router.get("/", getAllOrderStatuses);
router.post("/", orderStatus);
export default router;
