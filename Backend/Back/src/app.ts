import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./auth/routes/auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("API funcionando ✅"));

// Rutas de autenticación
app.use("/api/auth", authRoutes);

export default app;
