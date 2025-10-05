import { Router } from "express";
import {
  getAreass,
  getAreasById,
  createAreas,
  updateAreas,
  deleteAreas
} from "../controllers/areas.controller.js";

const router = Router();

router.get("/", getAreass);
router.get("/:id", getAreasById);
router.post("/", createAreas);
router.put("/:id", updateAreas);
router.delete("/:id", deleteAreas);

export default router;