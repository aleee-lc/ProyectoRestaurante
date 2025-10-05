import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getAreass(_req: Request, res: Response) {
  const data = await prisma.areas.findMany();
  res.json(data);
}

export async function getAreasById(req: Request, res: Response) {
  const item = await prisma.areas.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createAreas(req: Request, res: Response) {
  const newItem = await prisma.areas.create({ data: req.body });
  res.json(newItem);
}

export async function updateAreas(req: Request, res: Response) {
  const updated = await prisma.areas.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteAreas(req: Request, res: Response) {
  await prisma.areas.delete({ where: { id: req.params.id } });
  res.json({ message: "Areas eliminado" });
}