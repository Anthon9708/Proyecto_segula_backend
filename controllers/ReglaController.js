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

const create = async (req, res) => {    
    try {
        const nuevaRegla = await ReglaService.create(req.body);
        res.status(201).json(nuevaRegla);
    } catch (error) {
        console.error('Error al crear la regla:', error);
        res.status(500).send(error.message);
    }
}

const update = async (req, res) => {    
    try {
        const reglaActualizada = await ReglaService.update(req.params.id, req.body);
        res.json(reglaActualizada);
    } catch (error) {
        console.error('Error al actualizar la regla:', error);
        res.status(500).send(error.message);
    }
}

const baja = async (req, res) => {
    try {
        const reglaActualizada = await ReglaService.baja(req.params.id);
        res.json(reglaActualizada);
    } catch (error) {
        console.error('Error al dar de baja la regla:', error);
        res.status(500).send(error.message);
    }
}

module.exports = { getAll, getById, create, update, baja };