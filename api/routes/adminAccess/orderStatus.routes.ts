import { Router } from "express";
import { orderStatus } from "../../controllers/orderStatus/orderStatusController.js";

const router = Router();

// orderStatus
router.post("/", orderStatus);

export default router;
