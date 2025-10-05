import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getOrderss(_req: Request, res: Response) {
  const data = await prisma.orders.findMany();
  res.json(data);
}

export async function getOrdersById(req: Request, res: Response) {
  const item = await prisma.orders.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createOrders(req: Request, res: Response) {
  const newItem = await prisma.orders.create({ data: req.body });
  res.json(newItem);
}

export async function updateOrders(req: Request, res: Response) {
  const updated = await prisma.orders.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteOrders(req: Request, res: Response) {
  await prisma.orders.delete({ where: { id: req.params.id } });
  res.json({ message: "Orders eliminado" });
}