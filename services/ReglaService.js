const Regla = require('../models/Regla');

const getAll = async () => {
    try {
        return await Regla.findAll();
    } catch (error) {
        throw new Error('Error al obtener las reglas');
    }
};

const getById = async (id) => {
    try {
        const regla = await Regla.findByPk(id);
        if (regla) {
        return regla;
        } else {
        throw new Error('Regla no encontrada');
        }
    } catch (error) {
        throw new Error('Error al obtener la regla');
    }
};  

const create = async (data) => {
    try {
        const nuevaRegla = await Regla.create(data);        
        return nuevaRegla;
    } catch (error) {
        throw new Error('Error al crear la regla');
    }
}

const update = async (id, data) => {
    try {
        const regla = await Regla.findByPk(id);
        if (!regla) {
            throw new Error('Regla no encontrada');
        }
        const reglaActualizada = await regla.update(data);
        return reglaActualizada;
    } catch (error) {
        throw new Error('Error al actualizar la regla');
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update
};