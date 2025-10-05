import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getPurchaseItemss(_req: Request, res: Response) {
  const data = await prisma.purchaseitems.findMany();
  res.json(data);
}

export async function getPurchaseItemsById(req: Request, res: Response) {
  const item = await prisma.purchaseitems.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createPurchaseItems(req: Request, res: Response) {
  const newItem = await prisma.purchaseitems.create({ data: req.body });
  res.json(newItem);
}

export async function updatePurchaseItems(req: Request, res: Response) {
  const updated = await prisma.purchaseitems.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deletePurchaseItems(req: Request, res: Response) {
  await prisma.purchaseitems.delete({ where: { id: req.params.id } });
  res.json({ message: "PurchaseItems eliminado" });
}