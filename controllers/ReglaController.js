const ReglaService = require('../services/ReglaService');

const getAll = async (req, res) => {
    try {
        const reglas = await ReglaService.getAll();
        res.json(reglas);
    } catch (error) {
        console.error('Error al obtener los reglas:', error);
        res.status(500).send('Error al obtener las reglas');
    }
};

const getById = async (req, res) => {
    try {
        const regla = await ReglaService.getById(req.params.id);
        res.json(regla);
    } catch (error) {
        console.error('Error al obtener la regla:', error);
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAll,
    getById,
};