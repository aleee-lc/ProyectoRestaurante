import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getCashSessionss(_req: Request, res: Response) {
  const data = await prisma.cashsessions.findMany();
  res.json(data);
}

export async function getCashSessionsById(req: Request, res: Response) {
  const item = await prisma.cashsessions.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createCashSessions(req: Request, res: Response) {
  const newItem = await prisma.cashsessions.create({ data: req.body });
  res.json(newItem);
}

export async function updateCashSessions(req: Request, res: Response) {
  const updated = await prisma.cashsessions.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteCashSessions(req: Request, res: Response) {
  await prisma.cashsessions.delete({ where: { id: req.params.id } });
  res.json({ message: "CashSessions eliminado" });
}