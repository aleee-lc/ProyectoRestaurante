import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getSupplierss(_req: Request, res: Response) {
  const data = await prisma.suppliers.findMany();
  res.json(data);
}

export async function getSuppliersById(req: Request, res: Response) {
  const item = await prisma.suppliers.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createSuppliers(req: Request, res: Response) {
  const newItem = await prisma.suppliers.create({ data: req.body });
  res.json(newItem);
}

export async function updateSuppliers(req: Request, res: Response) {
  const updated = await prisma.suppliers.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteSuppliers(req: Request, res: Response) {
  await prisma.suppliers.delete({ where: { id: req.params.id } });
  res.json({ message: "Suppliers eliminado" });
}