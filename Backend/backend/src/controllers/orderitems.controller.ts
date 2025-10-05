import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getOrderItemss(_req: Request, res: Response) {
  const data = await prisma.orderitems.findMany();
  res.json(data);
}

export async function getOrderItemsById(req: Request, res: Response) {
  const item = await prisma.orderitems.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createOrderItems(req: Request, res: Response) {
  const newItem = await prisma.orderitems.create({ data: req.body });
  res.json(newItem);
}

export async function updateOrderItems(req: Request, res: Response) {
  const updated = await prisma.orderitems.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteOrderItems(req: Request, res: Response) {
  await prisma.orderitems.delete({ where: { id: req.params.id } });
  res.json({ message: "OrderItems eliminado" });
}