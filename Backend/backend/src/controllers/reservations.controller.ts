import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getReservationss(_req: Request, res: Response) {
  const data = await prisma.reservations.findMany();
  res.json(data);
}

export async function getReservationsById(req: Request, res: Response) {
  const item = await prisma.reservations.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createReservations(req: Request, res: Response) {
  const newItem = await prisma.reservations.create({ data: req.body });
  res.json(newItem);
}

export async function updateReservations(req: Request, res: Response) {
  const updated = await prisma.reservations.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteReservations(req: Request, res: Response) {
  await prisma.reservations.delete({ where: { id: req.params.id } });
  res.json({ message: "Reservations eliminado" });
}