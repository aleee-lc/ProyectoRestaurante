import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getStockMovess(_req: Request, res: Response) {
  const data = await prisma.stockmoves.findMany();
  res.json(data);
}

export async function getStockMovesById(req: Request, res: Response) {
  const item = await prisma.stockmoves.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createStockMoves(req: Request, res: Response) {
  const newItem = await prisma.stockmoves.create({ data: req.body });
  res.json(newItem);
}

export async function updateStockMoves(req: Request, res: Response) {
  const updated = await prisma.stockmoves.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteStockMoves(req: Request, res: Response) {
  await prisma.stockmoves.delete({ where: { id: req.params.id } });
  res.json({ message: "StockMoves eliminado" });
}