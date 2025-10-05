import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getRecipeItemss(_req: Request, res: Response) {
  const data = await prisma.recipeitems.findMany();
  res.json(data);
}

export async function getRecipeItemsById(req: Request, res: Response) {
  const item = await prisma.recipeitems.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createRecipeItems(req: Request, res: Response) {
  const newItem = await prisma.recipeitems.create({ data: req.body });
  res.json(newItem);
}

export async function updateRecipeItems(req: Request, res: Response) {
  const updated = await prisma.recipeitems.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteRecipeItems(req: Request, res: Response) {
  await prisma.recipeitems.delete({ where: { id: req.params.id } });
  res.json({ message: "RecipeItems eliminado" });
}