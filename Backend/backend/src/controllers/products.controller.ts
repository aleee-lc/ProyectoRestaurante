import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getProductss(_req: Request, res: Response) {
  const data = await prisma.products.findMany();
  res.json(data);
}

export async function getProductsById(req: Request, res: Response) {
  const item = await prisma.products.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createProducts(req: Request, res: Response) {
  const newItem = await prisma.products.create({ data: req.body });
  res.json(newItem);
}

export async function updateProducts(req: Request, res: Response) {
  const updated = await prisma.products.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteProducts(req: Request, res: Response) {
  await prisma.products.delete({ where: { id: req.params.id } });
  res.json({ message: "Products eliminado" });
}