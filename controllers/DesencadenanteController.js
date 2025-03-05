const DesencadenanteService = require('../services/DesencadenanteService');

/**
 * Obtener todos los desencadenantes. 
*/
const getAll = async (req, res) => {
    try {
        const desencadenantes = await DesencadenanteService.getAll();
        res.json(desencadenantes);
    } catch (error) {
        console.error('Error al obtener los desencadenantes:', error);
        res.status(500).send('Error al obtener los desencadenantes');
    }
};

/**
 * Obtener un desencadenante por ID. 
*/
const getById = async (req, res) => {
    try {
        const desencadenante = await DesencadenanteService.getById(req.params.id);
        res.json(desencadenante);
    } catch (error) {
        console.error('Error al obtener el desencadenante:', error);
        res.status(500).send(error.message);
    }
};

/**
 * Crear un nuevo desencadenante. 
*/
const create = async (req, res) => {    
    try {
        const nuevoDesencadenante = await DesencadenanteService.create(req.body);
        res.status(201).json(nuevoDesencadenante);
    } catch (error) {
        console.error('Error al crear el desencadenante:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Actualizar un desencadenante por ID. 
*/
const update = async (req, res) => {    
    try {
        const desencadenanteActualizado = await DesencadenanteService.update(req.params.id, req.body);
        res.json(desencadenanteActualizado);
    } catch (error) {
        console.error('Error al actualizar el desencadenanten:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Dar de baja un desencadenante por ID. 
*/
const baja = async (req, res) => {
    try {
        const desencadenanteActualizado = await DesencadenanteService.baja(req.params.id);
        res.json(desencadenanteActualizado);
    } catch (error) {
        console.error('Error al dar de baja el desencadenante:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Dar de alta un desencadenante por ID. 
*/
const alta = async (req, res) => {
    try {
        const desencadenanteActualizado = await DesencadenanteService.alta(req.params.id);
        res.json(desencadenanteActualizado);
    } catch (error) {
        console.error('Error al dar de alta el desencadenante:', error);
        res.status(500).send(error.message);
    }
}

module.exports = { getAll, getById, create, update, baja, alta };