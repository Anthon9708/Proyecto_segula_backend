const { getReglas, getReglaById } = require('../services/ReglaService');

const obtenerReglas = async (req, res) => {
  try {
    const reglas = await getReglas();
    res.json(reglas);
  } catch (error) {
    console.error('Error al obtener los reglas:', error);
    res.status(500).send('Error al obtener las reglas');
  }
};

const obtenerReglaPorId = async (req, res) => {
  try {
    const regla = await getReglaById(req.params.id);
    res.json(regla);
  } catch (error) {
    console.error('Error al obtener la regla:', error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  obtenerReglas,
  obtenerReglaPorId,
};