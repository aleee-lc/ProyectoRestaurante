import { Router } from "express";
import {
  getIngredientss,
  getIngredientsById,
  createIngredients,
  updateIngredients,
  deleteIngredients
} from "../controllers/ingredients.controller.js";

const router = Router();

router.get("/", getIngredientss);
router.get("/:id", getIngredientsById);
router.post("/", createIngredients);
router.put("/:id", updateIngredients);
router.delete("/:id", deleteIngredients);

export default router;