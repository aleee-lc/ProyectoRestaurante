import { Router } from "express";
import {
  getPaymentss,
  getPaymentsById,
  createPayments,
  updatePayments,
  deletePayments
} from "../controllers/payments.controller.js";

const router = Router();

router.get("/", getPaymentss);
router.get("/:id", getPaymentsById);
router.post("/", createPayments);
router.put("/:id", updatePayments);
router.delete("/:id", deletePayments);

export default router;