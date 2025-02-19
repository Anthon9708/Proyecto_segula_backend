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

const create = async (req, res) => {    
    try {
        const nuevoDato = await DatoService.create(req.body);
        res.status(201).json(nuevoDato);
    } catch (error) {
        console.error('Error al crear el dato:', error);
        res.status(500).send(error.message);
    }
}

const update = async (req, res) => {    
    try {
        const datoActualizado = await DatoService.update(req.params.id, req.body);
        res.json(datoActualizado);
    } catch (error) {
        console.error('Error al actualizar el dato:', error);
        res.status(500).send(error.message);
    }
}

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

const getByIdRegla = async (req, res) => {
    try {
        const datos = await DatoService.getByIdRegla(req.params.id);
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send(error.message);
    }
};

const createOrUpdateByIdRegla = async (req, res) => {    
    try {        
        const updatedDatos = await DatoService.createOrUpdateByIdRegla(req.body);
        res.status(201).json(updatedDatos);
    } catch (error) {
        console.error('Error al actualizar los datos:', error);
        res.status(500).send(error.message);
    }
}

const getParamsById = async (req, res) => {
    try {
        const datos = await DatoService.getParamsById(req.params.id);
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send(error.message);
    }
}

module.exports = { getAll, getById, create, update, getByFields, getByIdRegla, createOrUpdateByIdRegla, getParamsById };