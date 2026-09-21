import multer from "multer";
import path from "path";
import fs from "fs";

// Crea carpeta si no existe
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Multer dinámico según tipo (usuario o producto)
export const uploadImage = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join("src/uploads", folderName);
      ensureDir(dir);
      cb(null, dir);
    },

    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname).toLowerCase();
      const uniqueName = `${Date.now()}_${Math.random().toString(36).slice(2)}${extension}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Formato de imagen no permitido"), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  });
};
