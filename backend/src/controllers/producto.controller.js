import Producto from "../models/Producto.js";
import fs from "fs";
import path from "path";

// Controlador simplificado alineado al modelo SQL
export const createProduct = async (req, res) => {
  try {
    const imagen = req.file ? req.file.filename : null;

    const nuevo = await Producto.create({
      nombre: req.body.nombre,
      especificaciones: req.body.especificaciones,
      precio: req.body.precio,
      descuento: req.body.descuento,
      stock: req.body.stock,
      FK_id_categoria: req.body.FK_id_categoria,
      FK_id_marca: req.body.FK_id_marca,
      imagen: imagen
    });

    res.json({ message: "Producto creado exitosamente", data: nuevo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no existe" });

    let imagen = producto.imagen;
    if (req.file) imagen = req.file.filename;

    await producto.update({ ...req.body, imagen });

    res.json({ message: "Producto actualizado", data: producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no existe" });

    await producto.destroy();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const uploadProductPicture = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Producto.findByPk(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // Eliminar imagen anterior
    if (product.imagen_principal) {
      const oldPath = path.join("src/uploads/productos", product.imagen_principal);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Guardar nueva imagen
    product.imagen_principal = req.file.filename;
    await product.save();

    res.json({
      message: "Imagen del producto actualizada",
      imagen_principal: product.imagen_principal,
    });
  } catch (error) {
    console.error("uploadProductPicture error:", error);
    res.status(500).json({ message: "Error al subir imagen" });
  }
};