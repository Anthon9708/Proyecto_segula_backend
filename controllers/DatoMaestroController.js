const DatoMaestroService = require('../services/DatoMaestroService');

const getAll = async (req, res) => {
    try {
        const datos = await DatoMaestroService.getAll();
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos maestros:', error);
        res.status(500).send('Error al obtener los datos maestros');
    }
};

const getById = async (req, res) => {
    try {
        const dato = await DatoMaestroService.getById(req.params.id);
        res.json(dato);
    } catch (error) {
        console.error('Error al obtener el dato maestro:', error);
        res.status(500).send(error.message);
    }
};

const create = async (req, res) => {    
    try {
        const nuevoDato = await DatoMaestroService.create(req.body);
        res.status(201).json(nuevoDato);
    } catch (error) {
        console.error('Error al crear el dato maestro:', error);
        res.status(500).send(error.message);
    }
}

const update = async (req, res) => {    
    try {
        const datoActualizado = await DatoMaestroService.update(req.params.id, req.body);
        res.json(datoActualizado);
    } catch (error) {
        console.error('Error al actualizar el dato maestro:', error);
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update
};