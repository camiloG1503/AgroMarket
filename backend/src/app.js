import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import marcaRoutes from "./routes/marca.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import cartRoutes from "./routes/cat.routes.js";
import cuponRoutes from "./routes/cupon.routes.js";
import pedidoRoutes from "./routes/pedido.routes.js";
import direccionRoutes from "./routes/direccion.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";
import pagoRoutes from "./routes/pago.routes.js";
import dashboardRoutes from "./routes/dashboard.admin.routes.js";
import dashboardEmpleadoRoutes from "./routes/dashboard.empleado.routes.js";
import dashboardReportesRoutes from "./routes/dashboard.reportes.routes.js";
import dashboardUserRoutes from "./routes/dashboard.user.routes.js";
import resenaRoutes from "./routes/resena.routes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
for (const origin of ["http://localhost:5173", "http://127.0.0.1:5173"]) {
  if (!allowedOrigins.includes(origin)) allowedOrigins.push(origin);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origen no permitido por CORS"));
  },
}));
app.use(express.json({ limit: "1mb" }));

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", cuponRoutes);
app.use("/api/orders", pedidoRoutes);
app.use("/api/addresses", direccionRoutes);
app.use("/api/favorites", favoritosRoutes);
app.use("/api/payments", pagoRoutes);
app.use("/api/reviews", resenaRoutes);


// Rutas Dashboard Admin, Usuario, Empleado y Reportes
app.use("/api/dashboard/admin", dashboardRoutes);
app.use("/api/dashboard/user", dashboardUserRoutes);
app.use("/api/dashboard/empleado", dashboardEmpleadoRoutes);
app.use("/api/dashboard/reportes", dashboardReportesRoutes);


// Servir imágenes (usuarios + productos)
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);

app.get("/", (req, res) => {
  res.send("AgroMarket Backend funcionando correctamente");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "agromarket-api" });
});

app.use((error, req, res, next) => {
  if (error.message === "Origen no permitido por CORS") {
    return res.status(403).json({ message: error.message });
  }
  if (error instanceof SyntaxError && error.status === 400 && error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "JSON inválido" });
  }
  return next(error);
});

app.use((error, req, res, next) => {
  console.error("Error no controlado:", error);
  res.status(500).json({ message: "Error interno del servidor" });
});

export default app;