import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getReservationTabless(_req: Request, res: Response) {
  const data = await prisma.reservationtables.findMany();
  res.json(data);
}

export async function getReservationTablesById(req: Request, res: Response) {
  const item = await prisma.reservationtables.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createReservationTables(req: Request, res: Response) {
  const newItem = await prisma.reservationtables.create({ data: req.body });
  res.json(newItem);
}

export async function updateReservationTables(req: Request, res: Response) {
  const updated = await prisma.reservationtables.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteReservationTables(req: Request, res: Response) {
  await prisma.reservationtables.delete({ where: { id: req.params.id } });
  res.json({ message: "ReservationTables eliminado" });
}