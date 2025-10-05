import { Router } from "express";
import {
  getSupplierss,
  getSuppliersById,
  createSuppliers,
  updateSuppliers,
  deleteSuppliers
} from "../controllers/suppliers.controller.js";

const router = Router();

router.get("/", getSupplierss);
router.get("/:id", getSuppliersById);
router.post("/", createSuppliers);
router.put("/:id", updateSuppliers);
router.delete("/:id", deleteSuppliers);

export default router;