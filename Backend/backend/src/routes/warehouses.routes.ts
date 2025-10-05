import { Router } from "express";
import {
  getWarehousess,
  getWarehousesById,
  createWarehouses,
  updateWarehouses,
  deleteWarehouses
} from "../controllers/warehouses.controller.js";

const router = Router();

router.get("/", getWarehousess);
router.get("/:id", getWarehousesById);
router.post("/", createWarehouses);
router.put("/:id", updateWarehouses);
router.delete("/:id", deleteWarehouses);

export default router;