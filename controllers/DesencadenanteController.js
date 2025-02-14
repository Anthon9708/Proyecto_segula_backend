const { getDesencadenantes, getDesencadenanteById } = require('../services/DesencadenanteService');

const obtenerDesencadenantes = async (req, res) => {
  try {
    const desencadenantes = await getDesencadenantes();
    res.json(desencadenantes);
  } catch (error) {
    console.error('Error al obtener los desencadenantes:', error);
    res.status(500).send('Error al obtener los desencadenantes');
  }
};

const obtenerDesencadenantePorId = async (req, res) => {
  try {
    const desencadenante = await getDesencadenanteById(req.params.id);
    res.json(desencadenante);
  } catch (error) {
    console.error('Error al obtener el desencadenante:', error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  obtenerDesencadenantes,
  obtenerDesencadenantePorId,
};