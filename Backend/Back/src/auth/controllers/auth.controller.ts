import { Request, Response } from "express";
import { db, auth } from "../firebase";
import { sendEmail } from "../utils/sendEmail";

export async function sendOtp(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Falta el email" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await db.collection("emailOtps").doc(email).set({
    code,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
  });

  await sendEmail(email, "Tu código de verificación", `Tu código es: ${code}`);
  res.json({ message: "Código enviado ✅" });
}

export async function verifyOtp(req: Request, res: Response) {
  const { email, code } = req.body;
  const doc = await db.collection("emailOtps").doc(email).get();

  if (!doc.exists) return res.status(400).json({ error: "Código no encontrado" });
  const data = doc.data();

  if (Date.now() > data!.expiresAt) return res.status(400).json({ error: "Código expirado" });
  if (data!.code !== code) return res.status(400).json({ error: "Código incorrecto" });

  // Crea o recupera usuario Firebase
  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch {
    user = await auth.createUser({ email });
  }

  const token = await auth.createCustomToken(user.uid);
  res.json({ token });
}
