import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getProductModifierss(_req: Request, res: Response) {
  const data = await prisma.productmodifiers.findMany();
  res.json(data);
}

export async function getProductModifiersById(req: Request, res: Response) {
  const item = await prisma.productmodifiers.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createProductModifiers(req: Request, res: Response) {
  const newItem = await prisma.productmodifiers.create({ data: req.body });
  res.json(newItem);
}

export async function updateProductModifiers(req: Request, res: Response) {
  const updated = await prisma.productmodifiers.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteProductModifiers(req: Request, res: Response) {
  await prisma.productmodifiers.delete({ where: { id: req.params.id } });
  res.json({ message: "ProductModifiers eliminado" });
}