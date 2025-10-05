import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getOrderStatusHistorys(_req: Request, res: Response) {
  const data = await prisma.orderstatushistory.findMany();
  res.json(data);
}

export async function getOrderStatusHistoryById(req: Request, res: Response) {
  const item = await prisma.orderstatushistory.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createOrderStatusHistory(req: Request, res: Response) {
  const newItem = await prisma.orderstatushistory.create({ data: req.body });
  res.json(newItem);
}

export async function updateOrderStatusHistory(req: Request, res: Response) {
  const updated = await prisma.orderstatushistory.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteOrderStatusHistory(req: Request, res: Response) {
  await prisma.orderstatushistory.delete({ where: { id: req.params.id } });
  res.json({ message: "OrderStatusHistory eliminado" });
}