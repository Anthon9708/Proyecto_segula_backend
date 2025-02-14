const DatoService = require('../services/DatoService');

const getAll = async (req, res) => {
    try {
        const datos = await DatoService.getAll();
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos');
    }
};

const getById = async (req, res) => {
    try {
        const dato = await DatoService.getById(req.params.id);
        res.json(dato);
    } catch (error) {
        console.error('Error al obtener el dato:', error);
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAll,
    getById,
};
