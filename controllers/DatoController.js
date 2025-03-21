const DatoService = require('../services/DatoService');

/**
 * Obtener todos los datos.
*/
const getAll = async (req, res) => {
    try {
        const datos = await DatoService.getAll();
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos');
    }
};

/**
 * Obtener un dato por ID.
*/
const getById = async (req, res) => {
    try {
        const dato = await DatoService.getById(req.params.id);
        res.json(dato);
    } catch (error) {
        console.error('Error al obtener el dato:', error);
        res.status(500).send(error.message);
    }
};

/**
 * Crear un nuevo dato.
 */
const create = async (req, res) => {    
    try {
        const nuevoDato = await DatoService.create(req.body);
        res.status(201).json(nuevoDato);
    } catch (error) {
        console.error('Error al crear el dato:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Actualizar un dato por ID.
 */
const update = async (req, res) => {    
    try {
        const datoActualizado = await DatoService.update(req.params.id, req.body);
        res.json(datoActualizado);
    } catch (error) {
        console.error('Error al actualizar el dato:', error);
        res.status(500).send(error.message);
    }
}

/**
 * obtener datos por campos específicos.
*/
const getByFields = async (req, res) => {
    try {
        const conditions = {};
        if (req.query.campo1) {
            conditions.campo1 = req.query.campo1;
        }
        if (req.query.campo2) {
            conditions.campo2 = req.query.campo2;
        }
        const datos = await DatoService.getByFields(conditions);
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send(error.message);
    }
};

/**
 * obtener datos por ID de regla.
*/
const getByIdRegla = async (req, res) => {
    try {
        const datos = await DatoService.getByIdRegla(req.params.id);
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send(error.message);
    }
};

/**
 * Crear o actualizar un dato por ID de regla. 
*/
const createOrUpdateByIdRegla = async (req, res) => {    
    try {        
        const updatedDatos = await DatoService.createOrUpdateByIdRegla(req.body);
        res.status(201).json(updatedDatos);
    } catch (error) {
        console.error('Error al actualizar los datos:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Dar de baja todos los datos por ID de regla. 
*/
const bajaAllByIdRegla = async (req, res) => {    
    try {        
        const updatedDatos = await DatoService.bajaAllByIdRegla(req.params.id);
        res.status(201).json(updatedDatos);
    } catch (error) {
        console.error('Error al actualizar los datos:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Obtener parámetros por ID. 
*/
const getParamsById = async (req, res) => {
    try {
        const datos = await DatoService.getParamsById(req.params.id);
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Dar de baja un dato por ID. 
*/
const baja = async (req, res) => {
    try {
        const datoActualizado = await DatoService.baja(req.params.id);
        res.json(datoActualizado);
    } catch (error) {
        console.error('Error al dar de baja el dato:', error);
        res.status(500).send(error.message);
    }
}

/**
 * Dar de alta un dato por ID. 
*/
const alta = async (req, res) => {
    try {
        const datoActualizado = await DatoService.alta(req.params.id);
        res.json(datoActualizado);
    } catch (error) {
        console.error('Error al dar de alta el dato:', error);
        res.status(500).send(error.message);
    }
}

module.exports = { getAll, getById, create, update, getByFields, getByIdRegla, createOrUpdateByIdRegla, bajaAllByIdRegla, getParamsById, baja, alta };