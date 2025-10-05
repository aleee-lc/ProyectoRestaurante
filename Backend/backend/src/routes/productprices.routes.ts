import { Router } from "express";
import {
  getProductPricess,
  getProductPricesById,
  createProductPrices,
  updateProductPrices,
  deleteProductPrices
} from "../controllers/productprices.controller.js";

const router = Router();

router.get("/", getProductPricess);
router.get("/:id", getProductPricesById);
router.post("/", createProductPrices);
router.put("/:id", updateProductPrices);
router.delete("/:id", deleteProductPrices);

export default router;