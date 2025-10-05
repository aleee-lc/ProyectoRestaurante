import { Router } from "express";
import {
  getOrderItemModifierss,
  getOrderItemModifiersById,
  createOrderItemModifiers,
  updateOrderItemModifiers,
  deleteOrderItemModifiers
} from "../controllers/orderitemmodifiers.controller.js";

const router = Router();

router.get("/", getOrderItemModifierss);
router.get("/:id", getOrderItemModifiersById);
router.post("/", createOrderItemModifiers);
router.put("/:id", updateOrderItemModifiers);
router.delete("/:id", deleteOrderItemModifiers);

export default router;