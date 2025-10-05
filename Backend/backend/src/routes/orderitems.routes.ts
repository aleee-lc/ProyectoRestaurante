import { Router } from "express";
import {
  getOrderItemss,
  getOrderItemsById,
  createOrderItems,
  updateOrderItems,
  deleteOrderItems
} from "../controllers/orderitems.controller.js";

const router = Router();

router.get("/", getOrderItemss);
router.get("/:id", getOrderItemsById);
router.post("/", createOrderItems);
router.put("/:id", updateOrderItems);
router.delete("/:id", deleteOrderItems);

export default router;