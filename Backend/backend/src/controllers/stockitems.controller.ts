import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getStockItemss(_req: Request, res: Response) {
  const data = await prisma.stockitems.findMany();
  res.json(data);
}

export async function getStockItemsById(req: Request, res: Response) {
  const item = await prisma.stockitems.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createStockItems(req: Request, res: Response) {
  const newItem = await prisma.stockitems.create({ data: req.body });
  res.json(newItem);
}

export async function updateStockItems(req: Request, res: Response) {
  const updated = await prisma.stockitems.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteStockItems(req: Request, res: Response) {
  await prisma.stockitems.delete({ where: { id: req.params.id } });
  res.json({ message: "StockItems eliminado" });
}