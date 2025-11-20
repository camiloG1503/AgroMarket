import Categoria from "../models/Categoria.js";

// Crear categoría
export const createCategory = async (req, res) => {
    try {
        const { nombre_categoria, descripcion_categoria } = req.body;
        if (!nombre_categoria) {
            return res.status(400).json({ message: "El nombre de la categoría es obligatorio" });
        }
        const existe = await Categoria.findOne({ where: { nombre_categoria } });
        if (existe) {
            return res.status(409).json({ message: "La categoría ya existe" });
        }
        const categoria = await Categoria.create({ nombre_categoria, descripcion_categoria });
        res.status(201).json({ message: "Categoría creada correctamente", categoria });
    } catch (error) {
        console.error("Error en createCategory:", error);
        res.status(500).json({ message: "Error al crear la categoría" });
    }
};

// Obtener todas
export const getAllCategories = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        console.error("Error en getAllCategories:", error);
        res.status(500).json({ message: "Error al obtener las categorías" });
    }
};

// Obtener por ID
export const getCategoryById = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json(categoria);
    } catch (error) {
        console.error("Error en getCategoryById:", error);
        res.status(500).json({ message: "Error al obtener la categoría" });
    }
};

// Actualizar
export const updateCategory = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        await categoria.update(req.body);
        res.json({ message: "Categoría actualizada correctamente", categoria });
    }
    catch (error) {
        console.error("Error en updateCategory:", error);
        res.status(500).json({ message: "Error al actualizar la categoría" });
    } 
};

// Eliminar
export const deleteCategory = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        await categoria.destroy();
        res.json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        console.error("Error en deleteCategory:", error);
        res.status(500).json({ message: "Error al eliminar la categoría" });
    }
};