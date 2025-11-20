import Marca from "../models/Marca.js";

// Crear una Marca
export const createMarca = async (req, res) => {
    try {
        const { nombre_marca, descripcion_marca } = req.body;
        if (!nombre_marca) {
            return res.status(400).json({ message: "El nombre de la marca es obligatorio" });
        }

        const existe = await Marca.findOne({ where: { nombre_marca } });
        if (existe) {
            return res.status(409).json({ message: "La marca ya existe" });
        }

        const marca = await Marca.create({ nombre_marca, descripcion_marca });
        res.status(201).json({ message: "Marca creada correctamente", marca });
    } catch (error) {
        console.error("Error en createMarca:", error);
        res.status(500).json({ message: "Error al crear la marca" });
    }
};


// Listar todas las Marcas
export const getAllMarca = async (req, res) => {
    try {
        const marcas = await Marca.findAll();
        res.json(marcas);
    } catch (error) {
        console.error("Error en listMarcas:", error);
        res.status(500).json({ message: "Error al listar las marcas" });
    }
};

// Obtener marca por ID
export const getMarcaById = async (req, res) => {
    try {
        const marca = await Marca.findByPk(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: "Marca no encontrada" });
        }

        res.json(marca);
    } catch (error) {
        console.error("Error en getMarcaById:", error);
        res.status(500).json({ message: "Error al obtener la marca" });
    }
};
    
// Actualizar una Marca
export const updateMarca = async (req, res) => {
    try {
        const marca = await Marca.findByPk(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: "Marca no encontrada" });
        }

        await marca.update(req.body);

        res.json({ message: "Marca actualizada correctamente", marca });

    } catch (error) {   
        console.error("Error en updateMarca:", error);
        res.status(500).json({ message: "Error al actualizar la marca" });
    }
};

// Eliminar una Marca
export const deleteMarca = async (req, res) => {
    try {
        const marca = await Marca.findByPk(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: "Marca no encontrada" });
        }
        await marca.destroy();
        res.json({ message: "Marca eliminada correctamente" });
    } catch (error) {
        console.error("Error en deleteMarca:", error);
        res.status(500).json({ message: "Error al eliminar la marca" });
    }
};