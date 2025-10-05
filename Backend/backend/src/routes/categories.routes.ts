import { Router } from "express";
import {
  getCategoriess,
  getCategoriesById,
  createCategories,
  updateCategories,
  deleteCategories
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/", getCategoriess);
router.get("/:id", getCategoriesById);
router.post("/", createCategories);
router.put("/:id", updateCategories);
router.delete("/:id", deleteCategories);

export default router;