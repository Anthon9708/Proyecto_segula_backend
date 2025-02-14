const { getDatosMaestros, getDatoMaestroById } = require('../services/DatoMaestroService');

const obtenerDatosMaestros = async (req, res) => {
  try {
    const datos = await getDatosMaestros();
    res.json(datos);
  } catch (error) {
    console.error('Error al obtener los datos maestros:', error);
    res.status(500).send('Error al obtener los datos maestros');
  }
};

const obtenerDatoMaestroPorId = async (req, res) => {
  try {
    const dato = await getDatoMaestroById(req.params.id);
    res.json(dato);
  } catch (error) {
    console.error('Error al obtener el dato maestro:', error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  obtenerDatosMaestros,
  obtenerDatoMaestroPorId,
};