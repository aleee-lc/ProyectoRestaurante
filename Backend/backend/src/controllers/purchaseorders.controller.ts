import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getPurchaseOrderss(_req: Request, res: Response) {
  const data = await prisma.purchaseorders.findMany();
  res.json(data);
}

export async function getPurchaseOrdersById(req: Request, res: Response) {
  const item = await prisma.purchaseorders.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createPurchaseOrders(req: Request, res: Response) {
  const newItem = await prisma.purchaseorders.create({ data: req.body });
  res.json(newItem);
}

export async function updatePurchaseOrders(req: Request, res: Response) {
  const updated = await prisma.purchaseorders.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deletePurchaseOrders(req: Request, res: Response) {
  await prisma.purchaseorders.delete({ where: { id: req.params.id } });
  res.json({ message: "PurchaseOrders eliminado" });
}