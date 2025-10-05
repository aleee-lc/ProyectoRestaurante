import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getOrderItemModifierss(_req: Request, res: Response) {
  const data = await prisma.orderitemmodifiers.findMany();
  res.json(data);
}

export async function getOrderItemModifiersById(req: Request, res: Response) {
  const item = await prisma.orderitemmodifiers.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createOrderItemModifiers(req: Request, res: Response) {
  const newItem = await prisma.orderitemmodifiers.create({ data: req.body });
  res.json(newItem);
}

export async function updateOrderItemModifiers(req: Request, res: Response) {
  const updated = await prisma.orderitemmodifiers.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteOrderItemModifiers(req: Request, res: Response) {
  await prisma.orderitemmodifiers.delete({ where: { id: req.params.id } });
  res.json({ message: "OrderItemModifiers eliminado" });
}