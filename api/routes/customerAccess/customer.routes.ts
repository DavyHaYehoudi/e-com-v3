import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {  getCustomer, updateCustomer } from "../../controllers/customer/customerController.js";

const router = Router();

// customer
router.get("/", verifyToken, getCustomer);
router.patch("/",verifyToken, updateCustomer)


export default router;
