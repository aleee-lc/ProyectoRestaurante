import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getRestaurantTabless(_req: Request, res: Response) {
  const data = await prisma.restauranttables.findMany();
  res.json(data);
}

export async function getRestaurantTablesById(req: Request, res: Response) {
  const item = await prisma.restauranttables.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createRestaurantTables(req: Request, res: Response) {
  const newItem = await prisma.restauranttables.create({ data: req.body });
  res.json(newItem);
}

export async function updateRestaurantTables(req: Request, res: Response) {
  const updated = await prisma.restauranttables.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteRestaurantTables(req: Request, res: Response) {
  await prisma.restauranttables.delete({ where: { id: req.params.id } });
  res.json({ message: "RestaurantTables eliminado" });
}