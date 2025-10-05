import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getUserss(_req: Request, res: Response) {
  const data = await prisma.users.findMany();
  res.json(data);
}

export async function getUsersById(req: Request, res: Response) {
  const item = await prisma.users.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function createUsers(req: Request, res: Response) {
  const newItem = await prisma.users.create({ data: req.body });
  res.json(newItem);
}

export async function updateUsers(req: Request, res: Response) {
  const updated = await prisma.users.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function deleteUsers(req: Request, res: Response) {
  await prisma.users.delete({ where: { id: req.params.id } });
  res.json({ message: "Users eliminado" });
}