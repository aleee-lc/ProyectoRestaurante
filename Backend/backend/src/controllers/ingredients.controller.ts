import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getIngredientss(_req: Request, res: Response) {
  const data = await prisma.ingredients.findMany();
  res.json(data);
}

export async function getIngredientsById(req: Request, res: Response) {
  const item = await prisma.ingredients.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createIngredients(req: Request, res: Response) {
  const newItem = await prisma.ingredients.create({ data: req.body });
  res.json(newItem);
}

export async function updateIngredients(req: Request, res: Response) {
  const updated = await prisma.ingredients.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteIngredients(req: Request, res: Response) {
  await prisma.ingredients.delete({ where: { id: req.params.id } });
  res.json({ message: "Ingredients eliminado" });
}