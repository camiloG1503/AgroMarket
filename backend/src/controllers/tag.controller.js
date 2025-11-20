import Tag from "../models/Tag.js";

// Crear un Tag
export const createTag = async (req, res) => {
    try {
        const { nombre_tag } = req.body;
        if (!nombre_tag) {
            return res.status(400).json({ message: "El nombre del tag es obligatorio" });
        }
        const existe = await Tag.findOne({ where: { nombre_tag } });
        if (existe) {
            return res.status(409).json({ message: "El tag ya existe" });
        }
        const tag = await Tag.create({ nombre_tag });
        res.status(201).json({ message: "Tag creado correctamente", tag });
    } catch (error) {
        console.error("Error en createTag:", error);
        res.status(500).json({ message: "Error al crear el tag" });
    }
};


// Listar todos los Tags
export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error) {
        console.error("Error en getAllTags:", error);
        res.status(500).json({ message: "Error al listar los tags" });
    }
};

// Obtener Tag por ID
export const getTagById = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Tag no encontrado" });
        }

        res.json(tag);
    } catch (error) {
        console.error("Error en getTagById:", error);
        res.status(500).json({ message: "Error al obtener el tag" });
    }
};

// Actualizar un Tag
export const updateTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Tag no encontrado" });
        }

        await tag.update(req.body);
        res.json({ message: "Tag actualizado correctamente", tag });
    } catch (error) {
        console.error("Error en updateTag:", error);
        res.status(500).json({ message: "Error al actualizar el tag" });
    }
};

// Eliminar un Tag
export const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Tag no encontrado" });
        }

        await tag.destroy();
        res.json({ message: "Tag eliminado correctamente" });
    } catch (error) {
        console.error("Error en deleteTag:", error);
        res.status(500).json({ message: "Error al eliminar el tag" });
    }
};
