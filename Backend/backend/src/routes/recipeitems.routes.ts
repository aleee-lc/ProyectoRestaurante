import { Router } from "express";
import {
  getRecipeItemss,
  getRecipeItemsById,
  createRecipeItems,
  updateRecipeItems,
  deleteRecipeItems
} from "../controllers/recipeitems.controller.js";

const router = Router();

router.get("/", getRecipeItemss);
router.get("/:id", getRecipeItemsById);
router.post("/", createRecipeItems);
router.put("/:id", updateRecipeItems);
router.delete("/:id", deleteRecipeItems);

export default router;