import { Router } from "express";
import {
  getRestaurantTabless,
  getRestaurantTablesById,
  createRestaurantTables,
  updateRestaurantTables,
  deleteRestaurantTables
} from "../controllers/restauranttables.controller.js";

const router = Router();

router.get("/", getRestaurantTabless);
router.get("/:id", getRestaurantTablesById);
router.post("/", createRestaurantTables);
router.put("/:id", updateRestaurantTables);
router.delete("/:id", deleteRestaurantTables);

export default router;