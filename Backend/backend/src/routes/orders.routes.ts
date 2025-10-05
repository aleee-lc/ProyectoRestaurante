import { Router } from "express";
import {
  getOrderss,
  getOrdersById,
  createOrders,
  updateOrders,
  deleteOrders
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/", getOrderss);
router.get("/:id", getOrdersById);
router.post("/", createOrders);
router.put("/:id", updateOrders);
router.delete("/:id", deleteOrders);

export default router;