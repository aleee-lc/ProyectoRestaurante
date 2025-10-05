import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getModifierss(_req: Request, res: Response) {
  const data = await prisma.modifiers.findMany();
  res.json(data);
}

export async function getModifiersById(req: Request, res: Response) {
  const item = await prisma.modifiers.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createModifiers(req: Request, res: Response) {
  const newItem = await prisma.modifiers.create({ data: req.body });
  res.json(newItem);
}

export async function updateModifiers(req: Request, res: Response) {
  const updated = await prisma.modifiers.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteModifiers(req: Request, res: Response) {
  await prisma.modifiers.delete({ where: { id: req.params.id } });
  res.json({ message: "Modifiers eliminado" });
}