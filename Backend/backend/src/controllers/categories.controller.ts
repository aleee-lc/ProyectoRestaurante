import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getCategoriess(_req: Request, res: Response) {
  const data = await prisma.categories.findMany();
  res.json(data);
}

export async function getCategoriesById(req: Request, res: Response) {
  const item = await prisma.categories.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createCategories(req: Request, res: Response) {
  const newItem = await prisma.categories.create({ data: req.body });
  res.json(newItem);
}

export async function updateCategories(req: Request, res: Response) {
  const updated = await prisma.categories.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteCategories(req: Request, res: Response) {
  await prisma.categories.delete({ where: { id: req.params.id } });
  res.json({ message: "Categories eliminado" });
}