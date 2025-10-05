import { Router } from "express";
import {
  getUserss,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUserss);
router.get("/:id", getUsersById);
router.post("/", createUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;