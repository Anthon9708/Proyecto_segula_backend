const { getDatos, getDatoById } = require('../services/DatoService');

const obtenerDatos = async (req, res) => {
  try {
    const datos = await getDatos();
    res.json(datos);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).send('Error al obtener los datos');
  }
};

const obtenerDatoPorId = async (req, res) => {
  try {
    const dato = await getDatoById(req.params.id);
    res.json(dato);
  } catch (error) {
    console.error('Error al obtener el dato:', error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  obtenerDatos,
  obtenerDatoPorId,
};