import { Router } from "express";
import {
  getPurchaseItemss,
  getPurchaseItemsById,
  createPurchaseItems,
  updatePurchaseItems,
  deletePurchaseItems
} from "../controllers/purchaseitems.controller.js";

const router = Router();

router.get("/", getPurchaseItemss);
router.get("/:id", getPurchaseItemsById);
router.post("/", createPurchaseItems);
router.put("/:id", updatePurchaseItems);
router.delete("/:id", deletePurchaseItems);

export default router;