import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// 👉 Aquí se monta el router
app.use("/api", routes);

app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
