import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa"; // para ejecutar prisma desde CLI

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getPrismaDMMF(schemaPath: string) {
  const { stdout } = await execa("npx", [
    "prisma",
    "format",
    "--schema",
    schemaPath,
  ]);
  console.log("📦 Prisma schema verificado:", schemaPath);

  const dmmfResult = await execa("npx", [
    "prisma",
    "generate",
    "--schema",
    schemaPath,
    "--no-engine",
  ]);
  console.log("⚙️ Prisma artifacts generados");
  return dmmfResult;
}

async function generateCRUD() {
  const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");

  await getPrismaDMMF(schemaPath);

  const controllersDir = path.join(process.cwd(), "src/controllers");
  const routesDir = path.join(process.cwd(), "src/routes");

  fs.mkdirSync(controllersDir, { recursive: true });
  fs.mkdirSync(routesDir, { recursive: true });

  // 👉 Leer el schema
  const schema = fs.readFileSync(schemaPath, "utf-8");

  const modelNames = Array.from(schema.matchAll(/model (\w+) {/g)).map(
    (m) => m[1]
  );

  const routeImports: string[] = [];
  const routeUses: string[] = [];

  for (const name of modelNames) {
    const lower = name.toLowerCase();

    // ---------- CONTROLLER ----------
    const controller = `
import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function get${name}s(_req: Request, res: Response) {
  const data = await prisma.${lower}.findMany();
  res.json(data);
}

export async function get${name}ById(req: Request, res: Response) {
  const item = await prisma.${lower}.findUnique({ where: { id: req.params.id } });
  res.json(item);
}

export async function create${name}(req: Request, res: Response) {
  const newItem = await prisma.${lower}.create({ data: req.body });
  res.json(newItem);
}

export async function update${name}(req: Request, res: Response) {
  const updated = await prisma.${lower}.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
}

export async function delete${name}(req: Request, res: Response) {
  await prisma.${lower}.delete({ where: { id: req.params.id } });
  res.json({ message: "${name} eliminado" });
}
`;
    fs.writeFileSync(path.join(controllersDir, `${lower}.controller.ts`), controller.trim());

    // ---------- ROUTE ----------
    const route = `
import { Router } from "express";
import {
  get${name}s,
  get${name}ById,
  create${name},
  update${name},
  delete${name}
} from "../controllers/${lower}.controller.js";

const router = Router();

router.get("/", get${name}s);
router.get("/:id", get${name}ById);
router.post("/", create${name});
router.put("/:id", update${name});
router.delete("/:id", delete${name});

export default router;
`;
    fs.writeFileSync(path.join(routesDir, `${lower}.routes.ts`), route.trim());

    routeImports.push(`import ${lower}Routes from "./${lower}.routes.js";`);
    routeUses.push(`router.use("/${lower}", ${lower}Routes);`);
  }

  const indexRoute = `
import { Router } from "express";
${routeImports.join("\n")}

const router = Router();

${routeUses.join("\n")}

export default router;
`;
  fs.writeFileSync(path.join(routesDir, "index.ts"), indexRoute.trim());

  console.log("✅ CRUDs generados correctamente");
}

generateCRUD().catch((err) => {
  console.error("❌ Error al generar CRUDs:", err);
});
