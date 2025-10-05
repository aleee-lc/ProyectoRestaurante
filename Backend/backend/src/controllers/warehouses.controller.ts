import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getWarehousess(_req: Request, res: Response) {
  const data = await prisma.warehouses.findMany();
  res.json(data);
}

export async function getWarehousesById(req: Request, res: Response) {
  const item = await prisma.warehouses.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createWarehouses(req: Request, res: Response) {
  const newItem = await prisma.warehouses.create({ data: req.body });
  res.json(newItem);
}

export async function updateWarehouses(req: Request, res: Response) {
  const updated = await prisma.warehouses.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteWarehouses(req: Request, res: Response) {
  await prisma.warehouses.delete({ where: { id: req.params.id } });
  res.json({ message: "Warehouses eliminado" });
}