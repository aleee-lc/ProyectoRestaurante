import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getCustomerss(_req: Request, res: Response) {
  const data = await prisma.customers.findMany();
  res.json(data);
}

export async function getCustomersById(req: Request, res: Response) {
  const item = await prisma.customers.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createCustomers(req: Request, res: Response) {
  const newItem = await prisma.customers.create({ data: req.body });
  res.json(newItem);
}

export async function updateCustomers(req: Request, res: Response) {
  const updated = await prisma.customers.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteCustomers(req: Request, res: Response) {
  await prisma.customers.delete({ where: { id: req.params.id } });
  res.json({ message: "Customers eliminado" });
}