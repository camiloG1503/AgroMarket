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
      const uniqueName = Date.now() + "_" + file.originalname.replace(/\s+/g, "_");
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

  return multer({ storage, fileFilter });
};
