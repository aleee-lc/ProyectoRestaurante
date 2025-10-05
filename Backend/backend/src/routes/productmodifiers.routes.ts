import { Router } from "express";
import {
  getProductModifierss,
  getProductModifiersById,
  createProductModifiers,
  updateProductModifiers,
  deleteProductModifiers
} from "../controllers/productmodifiers.controller.js";

const router = Router();

router.get("/", getProductModifierss);
router.get("/:id", getProductModifiersById);
router.post("/", createProductModifiers);
router.put("/:id", updateProductModifiers);
router.delete("/:id", deleteProductModifiers);

export default router;