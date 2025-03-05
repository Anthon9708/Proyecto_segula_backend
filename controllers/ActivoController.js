const ActivoService = require('../services/ActivoService');

/**
 * Obtener todos los activos.
*/
const getAll = async (req, res) => {
    try {
        const activos = await ActivoService.getAll();
        res.json(activos);
    } catch (error) {
        console.error('Error al obtener los activos:', error);
        res.status(500).send('Error al obtener los activos');
    }
};

/**
 * Obtener un activo por ID.
*/
const getById = async (req, res) => {
    try {
        const activo = await ActivoService.getById(req.params.id);
        res.json(activo);
    } catch (error) {
        console.error('Error al obtener el activo:', error);
        res.status(500).send(error.message);
    }
};

/**
 * Crear un nuevo activo.
 */
const create = async (req, res) => {    
    try {
        const nuevoActivo = await ActivoService.create(req.body);
        res.status(201).json(nuevoActivo);
    } catch (error) {
        console.error('Error al crear el activo:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Actualizar un activo por ID.
 */
const update = async (req, res) => {    
    try {
        const activoActualizado = await ActivoService.update(req.params.id, req.body);
        res.json(activoActualizado);
    } catch (error) {
        console.error('Error al actualizar el activo:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Dar de baja un activo por ID.
*/
const baja = async (req, res) => {
    try {
        const activoActualizado = await ActivoService.baja(req.params.id);
        res.json(activoActualizado);
    } catch (error) {
        console.error('Error al dar de baja el activo:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Dar de alta un activo por ID.
*/
const alta = async (req, res) => {
    try {
        const activoActualizado = await ActivoService.alta(req.params.id);
        res.json(activoActualizado);
    } catch (error) {
        console.error('Error al dar de alta el activo:', error);
        res.status(500).send(error.message);
    }
}

module.exports = { getAll, getById, create, update, baja, alta };