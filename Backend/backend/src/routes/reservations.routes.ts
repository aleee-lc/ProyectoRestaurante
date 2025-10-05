import { Router } from "express";
import {
  getReservationss,
  getReservationsById,
  createReservations,
  updateReservations,
  deleteReservations
} from "../controllers/reservations.controller.js";

const router = Router();

router.get("/", getReservationss);
router.get("/:id", getReservationsById);
router.post("/", createReservations);
router.put("/:id", updateReservations);
router.delete("/:id", deleteReservations);

export default router;