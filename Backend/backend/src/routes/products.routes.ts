import { Router } from "express";
import {
  getProductss,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProductss);
router.get("/:id", getProductsById);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;