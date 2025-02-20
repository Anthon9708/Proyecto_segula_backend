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
        data.fechaAlta = new Date();
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

const baja = async (id) => {
    try {
        const regla = await Regla.findByPk(id);
        if (!regla) {
            throw new Error('Regla no encontrado');
        }
        regla.fechaBaja = new Date();
        await regla.save();
        return regla;
    } catch (error) {
        throw new Error('Error al dar de baja la regla');
    }
}

const alta = async (id) => {
    try {
        const regla = await Regla.findByPk(id);
        if (!regla) {
            throw new Error('Regla no encontrado');
        }
        regla.fechaAlta = new Date();
        regla.fechaBaja = null;
        await regla.save();
        return regla;
    } catch (error) {
        throw new Error('Error al dar de alta la regla');
    }
}

module.exports = { getAll, getById, create, update, baja, alta };