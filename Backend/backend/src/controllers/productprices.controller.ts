import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getProductPricess(_req: Request, res: Response) {
  const data = await prisma.productprices.findMany();
  res.json(data);
}

export async function getProductPricesById(req: Request, res: Response) {
  const item = await prisma.productprices.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createProductPrices(req: Request, res: Response) {
  const newItem = await prisma.productprices.create({ data: req.body });
  res.json(newItem);
}

export async function updateProductPrices(req: Request, res: Response) {
  const updated = await prisma.productprices.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteProductPrices(req: Request, res: Response) {
  await prisma.productprices.delete({ where: { id: req.params.id } });
  res.json({ message: "ProductPrices eliminado" });
}