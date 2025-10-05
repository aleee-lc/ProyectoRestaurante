import { Router } from "express";
import {
  getShiftss,
  getShiftsById,
  createShifts,
  updateShifts,
  deleteShifts
} from "../controllers/shifts.controller.js";

const router = Router();

router.get("/", getShiftss);
router.get("/:id", getShiftsById);
router.post("/", createShifts);
router.put("/:id", updateShifts);
router.delete("/:id", deleteShifts);

export default router;