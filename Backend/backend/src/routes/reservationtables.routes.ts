import { Router } from "express";
import {
  getReservationTabless,
  getReservationTablesById,
  createReservationTables,
  updateReservationTables,
  deleteReservationTables
} from "../controllers/reservationtables.controller.js";

const router = Router();

router.get("/", getReservationTabless);
router.get("/:id", getReservationTablesById);
router.post("/", createReservationTables);
router.put("/:id", updateReservationTables);
router.delete("/:id", deleteReservationTables);

export default router;