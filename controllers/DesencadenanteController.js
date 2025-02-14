const DesencadenanteService = require('../services/DesencadenanteService');

const getAll = async (req, res) => {
    try {
        const desencadenantes = await DesencadenanteService.getAll();
        res.json(desencadenantes);
    } catch (error) {
        console.error('Error al obtener los desencadenantes:', error);
        res.status(500).send('Error al obtener los desencadenantes');
    }
};

const getById = async (req, res) => {
    try {
        const desencadenante = await DesencadenanteService.getById(req.params.id);
        res.json(desencadenante);
    } catch (error) {
        console.error('Error al obtener el desencadenante:', error);
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAll,
    getById,
};