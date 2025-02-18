const Dato = require('../models/Dato');

const getAll = async () => {
    try {
        return await Dato.findAll();
    } catch (error) {
        throw new Error('Error al obtener los datos');
    }
};

const getById = async (id) => {
    try {
        const dato = await Dato.findByPk(id);
        if (dato) {
        return dato;
        } else {
        throw new Error('Dato no encontrado');
        }
    } catch (error) {
        throw new Error('Error al obtener el dato');
    }
};  

const create = async (data) => {
    try {
        const nuevoDato = await Dato.create(data);        
        return nuevoDato;
    } catch (error) {
        throw new Error('Error al crear el dato');
    }
}

const update = async (id, data) => {
    try {
        const dato = await Dato.findByPk(id);
        if (!dato) {
            throw new Error('Dato no encontrado');
        }
        const datoActualizado = await dato.update(data);
        return datoActualizado;
    } catch (error) {
        throw new Error('Error al actualizar el dato');
    }
}

const getByFields = async (fields) => {
    try {
        return await Dato.findAll({
            where: fields
        });
    } catch (error) {
        throw new Error('Error al obtener los datos');
    }
}

const getByIdRegla = async (idRegla) => {
    try {
        return await Dato.findAll({
            where: {
                regla: idRegla
            }
        });
    } catch (error) {
        throw new Error('Error al obtener los datos');
    }
}

module.exports = { getAll, getById, create, update, getByFields, getByIdRegla };