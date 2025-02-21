const PosicionService = require('../services/PosicionService');

const getAll = async (req, res) => {
    try {
        const posiciones = await PosicionService.getAll();
        res.json(posiciones);
    } catch (error) {
        console.error('Error al obtener las posiciones:', error);
        res.status(500).send('Error al obtener las posiciones');
    }
};

const getById = async (req, res) => {
    try {
        const posicion = await PosicionService.getById(req.params.id);
        res.json(posicion);
    } catch (error) {
        console.error('Error al obtener la posicion:', error);
        res.status(500).send(error.message);
    }
};

const create = async (req, res) => {    
    try {
        const nuevaPosicion = await PosicionService.create(req.body);
        res.status(201).json(nuevaPosicion);
    } catch (error) {
        console.error('Error al crear la posicion:', error);
        res.status(500).send(error.message);
    }
}

const update = async (req, res) => {    
    try {
        const posicionActualizada = await PosicionService.update(req.params.id, req.body);
        res.json(posicionActualizada);
    } catch (error) {
        console.error('Error al actualizar la posicion:', error);
        res.status(500).send(error.message);
    }
}

const baja = async (req, res) => {
    try {
        const posicionActualizada = await PosicionService.baja(req.params.id);
        res.json(posicionActualizada);
    } catch (error) {
        console.error('Error al dar de baja la posicion:', error);
        res.status(500).send(error.message);
    }
}

const alta = async (req, res) => {
    try {
        const posicionActualizada = await PosicionService.alta(req.params.id);
        res.json(posicionActualizada);
    } catch (error) {
        console.error('Error al dar de alta la posicion:', error);
        res.status(500).send(error.message);
    }
}

module.exports = { getAll, getById, create, update, baja, alta };