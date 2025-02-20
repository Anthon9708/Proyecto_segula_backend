const DatoMaestro = require('../models/DatoMaestro');

const getAll = async () => {
    try {
        return await DatoMaestro.findAll();
    } catch (error) {
        throw new Error('Error al obtener los datos maestros');
    }
};

const getById = async (id) => {
    try {
        const datoMaestro = await DatoMaestro.findByPk(id);
        if (datoMaestro) {
        return datoMaestro;
        } else {
        throw new Error('Dato maestro no encontrado');
        }
    } catch (error) {
        throw new Error('Error al obtener el dato maestro');
    }
};  

const create = async (data) => {
    try {
        data.fechaAlta = new Date();
        const nuevoDato = await DatoMaestro.create(data);        
        return nuevoDato;
    } catch (error) {
        throw new Error('Error al crear el dato maestro');
    }
}

const update = async (id, data) => {
    try {
        const dato = await DatoMaestro.findByPk(id);
        if (!dato) {
            throw new Error('Dato maestro no encontrado');
        }
        const datoActualizado = await dato.update(data);
        return datoActualizado;
    } catch (error) {
        throw new Error('Error al actualizar el dato maestro');
    }
}

const baja = async (id) => {
    try {
        const dato = await DatoMaestro.findByPk(id);
        if (!dato) {
            throw new Error('Dato maestro no encontrado');
        }
        dato.fechaBaja = new Date();
        await dato.save();
        return dato;
    } catch (error) {
        throw new Error('Error al dar de baja el dato maestro');
    }
}

module.exports = { getAll, getById, create, update, baja };