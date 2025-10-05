import { Router } from "express";
import {
  getRecipess,
  getRecipesById,
  createRecipes,
  updateRecipes,
  deleteRecipes
} from "../controllers/recipes.controller.js";

const router = Router();

router.get("/", getRecipess);
router.get("/:id", getRecipesById);
router.post("/", createRecipes);
router.put("/:id", updateRecipes);
router.delete("/:id", deleteRecipes);

export default router;