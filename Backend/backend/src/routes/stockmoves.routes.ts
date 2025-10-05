import { Router } from "express";
import {
  getStockMovess,
  getStockMovesById,
  createStockMoves,
  updateStockMoves,
  deleteStockMoves
} from "../controllers/stockmoves.controller.js";

const router = Router();

router.get("/", getStockMovess);
router.get("/:id", getStockMovesById);
router.post("/", createStockMoves);
router.put("/:id", updateStockMoves);
router.delete("/:id", deleteStockMoves);

export default router;