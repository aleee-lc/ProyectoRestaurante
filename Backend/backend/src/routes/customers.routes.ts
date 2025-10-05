import { Router } from "express";
import {
  getCustomerss,
  getCustomersById,
  createCustomers,
  updateCustomers,
  deleteCustomers
} from "../controllers/customers.controller.js";

const router = Router();

router.get("/", getCustomerss);
router.get("/:id", getCustomersById);
router.post("/", createCustomers);
router.put("/:id", updateCustomers);
router.delete("/:id", deleteCustomers);

export default router;