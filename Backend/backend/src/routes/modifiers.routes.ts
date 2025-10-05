import { Router } from "express";
import {
  getModifierss,
  getModifiersById,
  createModifiers,
  updateModifiers,
  deleteModifiers
} from "../controllers/modifiers.controller.js";

const router = Router();

router.get("/", getModifierss);
router.get("/:id", getModifiersById);
router.post("/", createModifiers);
router.put("/:id", updateModifiers);
router.delete("/:id", deleteModifiers);

export default router;