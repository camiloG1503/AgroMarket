import Direccion from "../models/Direccion.js";

// Crear dirección
export const createAddress = async (req, res) => {
  try {
    const userId = req.user.id_usuario;
    const { direccion, barrio, ciudad, departamento } = req.body;

    if (!direccion || !ciudad || !departamento) {
      return res.status(400).json({ message: "Campos obligatorios faltantes" });
    }

    const nueva = await Direccion.create({
      FK_id_usuario: userId,
      direccion,
      barrio,
      ciudad,
      departamento
    });

    return res.status(201).json({ message: "Dirección creada", data: nueva });
  } catch (error) {
    console.error("createAddress error:", error);
    return res.status(500).json({ message: "Error al crear dirección" });
  }
};

// Listar direcciones del usuario
export const getMyAddresses = async (req, res) => {
  try {
    const userId = req.user.id_usuario;
    const direcciones = await Direccion.findAll({
      where: { FK_id_usuario: userId }
    });

    return res.json(direcciones);
  } catch (error) {
    console.error("getMyAddresses error:", error);
    return res.status(500).json({ message: "Error al obtener direcciones" });
  }
};

// Actualizar dirección
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id_usuario;

    const dir = await Direccion.findByPk(id);
    if (!dir) return res.status(404).json({ message: "Dirección no encontrada" });

    if (dir.FK_id_usuario !== userId)
      return res.status(403).json({ message: "No autorizado" });

    await dir.update(req.body);

    return res.json({ message: "Dirección actualizada", data: dir });
  } catch (error) {
    console.error("updateAddress error:", error);
    return res.status(500).json({ message: "Error al actualizar dirección" });
  }
};

// Eliminar dirección
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id_usuario;

    const dir = await Direccion.findByPk(id);
    if (!dir) return res.status(404).json({ message: "Dirección no encontrada" });

    if (dir.FK_id_usuario !== userId)
      return res.status(403).json({ message: "No autorizado" });

    await dir.destroy();

    return res.json({ message: "Dirección eliminada" });
  } catch (error) {
    console.error("deleteAddress error:", error);
    return res.status(500).json({ message: "Error al eliminar dirección" });
  }
};
