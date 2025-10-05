import { Router } from "express";
import {
  getPaymentAllocationss,
  getPaymentAllocationsById,
  createPaymentAllocations,
  updatePaymentAllocations,
  deletePaymentAllocations
} from "../controllers/paymentallocations.controller.js";

const router = Router();

router.get("/", getPaymentAllocationss);
router.get("/:id", getPaymentAllocationsById);
router.post("/", createPaymentAllocations);
router.put("/:id", updatePaymentAllocations);
router.delete("/:id", deletePaymentAllocations);

export default router;