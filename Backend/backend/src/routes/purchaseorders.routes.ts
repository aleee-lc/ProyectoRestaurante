import { Router } from "express";
import {
  getPurchaseOrderss,
  getPurchaseOrdersById,
  createPurchaseOrders,
  updatePurchaseOrders,
  deletePurchaseOrders
} from "../controllers/purchaseorders.controller.js";

const router = Router();

router.get("/", getPurchaseOrderss);
router.get("/:id", getPurchaseOrdersById);
router.post("/", createPurchaseOrders);
router.put("/:id", updatePurchaseOrders);
router.delete("/:id", deletePurchaseOrders);

export default router;