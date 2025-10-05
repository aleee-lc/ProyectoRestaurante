import { Router } from "express";
import {
  getStockItemss,
  getStockItemsById,
  createStockItems,
  updateStockItems,
  deleteStockItems
} from "../controllers/stockitems.controller.js";

const router = Router();

router.get("/", getStockItemss);
router.get("/:id", getStockItemsById);
router.post("/", createStockItems);
router.put("/:id", updateStockItems);
router.delete("/:id", deleteStockItems);

export default router;