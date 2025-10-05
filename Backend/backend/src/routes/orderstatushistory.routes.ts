import { Router } from "express";
import {
  getOrderStatusHistorys,
  getOrderStatusHistoryById,
  createOrderStatusHistory,
  updateOrderStatusHistory,
  deleteOrderStatusHistory
} from "../controllers/orderstatushistory.controller.js";

const router = Router();

router.get("/", getOrderStatusHistorys);
router.get("/:id", getOrderStatusHistoryById);
router.post("/", createOrderStatusHistory);
router.put("/:id", updateOrderStatusHistory);
router.delete("/:id", deleteOrderStatusHistory);

export default router;