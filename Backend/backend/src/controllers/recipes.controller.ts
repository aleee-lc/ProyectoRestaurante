import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getRecipess(_req: Request, res: Response) {
  const data = await prisma.recipes.findMany();
  res.json(data);
}

export async function getRecipesById(req: Request, res: Response) {
  const item = await prisma.recipes.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createRecipes(req: Request, res: Response) {
  const newItem = await prisma.recipes.create({ data: req.body });
  res.json(newItem);
}

export async function updateRecipes(req: Request, res: Response) {
  const updated = await prisma.recipes.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteRecipes(req: Request, res: Response) {
  await prisma.recipes.delete({ where: { id: req.params.id } });
  res.json({ message: "Recipes eliminado" });
}