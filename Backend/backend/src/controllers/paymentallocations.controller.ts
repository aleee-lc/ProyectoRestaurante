import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getPaymentAllocationss(_req: Request, res: Response) {
  const data = await prisma.paymentallocations.findMany();
  res.json(data);
}

export async function getPaymentAllocationsById(req: Request, res: Response) {
  const item = await prisma.paymentallocations.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createPaymentAllocations(req: Request, res: Response) {
  const newItem = await prisma.paymentallocations.create({ data: req.body });
  res.json(newItem);
}

export async function updatePaymentAllocations(req: Request, res: Response) {
  const updated = await prisma.paymentallocations.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deletePaymentAllocations(req: Request, res: Response) {
  await prisma.paymentallocations.delete({ where: { id: req.params.id } });
  res.json({ message: "PaymentAllocations eliminado" });
}