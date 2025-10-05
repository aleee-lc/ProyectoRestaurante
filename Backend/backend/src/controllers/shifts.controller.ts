import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getShiftss(_req: Request, res: Response) {
  const data = await prisma.shifts.findMany();
  res.json(data);
}

export async function getShiftsById(req: Request, res: Response) {
  const item = await prisma.shifts.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createShifts(req: Request, res: Response) {
  const newItem = await prisma.shifts.create({ data: req.body });
  res.json(newItem);
}

export async function updateShifts(req: Request, res: Response) {
  const updated = await prisma.shifts.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteShifts(req: Request, res: Response) {
  await prisma.shifts.delete({ where: { id: req.params.id } });
  res.json({ message: "Shifts eliminado" });
}