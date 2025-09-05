import { Router } from "express";
import { createOrder } from "../controllers/paymentController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/order", protect, createOrder);

export default router;
