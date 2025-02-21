const LogService = require('../services/LogService');

const getAll = async (req, res) => {
    try {
        const logs = await LogService.getAll();
        res.json(logs);
    } catch (error) {
        console.error('Error al obtener los logs:', error);
        res.status(500).send('Error al obtener los logs');
    }
};

const getById = async (req, res) => {
    try {
        const log = await LogService.getById(req.params.id);
        res.json(log);
    } catch (error) {
        console.error('Error al obtener el log:', error);
        res.status(500).send(error.message);
    }
};

const create = async (req, res) => {    
    try {
        const nuevoLog = await LogService.create(req.body);
        res.status(201).json(nuevoLog);
    } catch (error) {
        console.error('Error al crear el log:', error);
        res.status(500).send(error.message);
    }
}

const update = async (req, res) => {    
    try {
        const logActualizado = await LogService.update(req.params.id, req.body);
        res.json(logActualizado);
    } catch (error) {
        console.error('Error al actualizar el log:', error);
        res.status(500).send(error.message);
    }
}

const baja = async (req, res) => {
    try {
        const logActualizado = await LogService.baja(req.params.id);
        res.json(logActualizado);
    } catch (error) {
        console.error('Error al dar de baja el log:', error);
        res.status(500).send(error.message);
    }
}

const alta = async (req, res) => {
    try {
        const logActualizado = await LogService.alta(req.params.id);
        res.json(logActualizado);
    } catch (error) {
        console.error('Error al dar de alta el log:', error);
        res.status(500).send(error.message);
    }
}

module.exports = { getAll, getById, create, update, baja, alta };