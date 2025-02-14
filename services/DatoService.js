const { Dato } = require('../models/Dato');

const getDatos = async () => {
  try {
    return await Dato.findAll();
  } catch (error) {
    throw new Error('Error al obtener los datos en Servicio');
  }
};

const getDatoById = async (id) => {
  try {
    const dato = await Dato.findByPk(id);
    if (dato) {
      return dato;
    } else {
      throw new Error('Dato no encontrado');
    }
  } catch (error) {
    throw new Error('Error al obtener el dato');
  }
};  

module.exports = {
    getDatos,
    getDatoById,
  };