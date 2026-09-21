import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "La autenticación no está configurada" });
  }
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  }
  next();
};

export const isLogistico = (req, res, next) => {
  if (!req.user || req.user.rol !== "logistico") {
    return res.status(403).json({ message: "Acceso denegado. Solo usuarios logísticos." });
  }
  next();
};



