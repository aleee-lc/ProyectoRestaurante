import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getPaymentss(_req: Request, res: Response) {
  const data = await prisma.payments.findMany();
  res.json(data);
}

export async function getPaymentsById(req: Request, res: Response) {
  const item = await prisma.payments.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createPayments(req: Request, res: Response) {
  const newItem = await prisma.payments.create({ data: req.body });
  res.json(newItem);
}

export async function updatePayments(req: Request, res: Response) {
  const updated = await prisma.payments.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deletePayments(req: Request, res: Response) {
  await prisma.payments.delete({ where: { id: req.params.id } });
  res.json({ message: "Payments eliminado" });
}