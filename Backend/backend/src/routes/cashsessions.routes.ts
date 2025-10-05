import { Router } from "express";
import {
  getCashSessionss,
  getCashSessionsById,
  createCashSessions,
  updateCashSessions,
  deleteCashSessions
} from "../controllers/cashsessions.controller.js";

const router = Router();

router.get("/", getCashSessionss);
router.get("/:id", getCashSessionsById);
router.post("/", createCashSessions);
router.put("/:id", updateCashSessions);
router.delete("/:id", deleteCashSessions);

export default router;