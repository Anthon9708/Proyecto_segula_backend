const Posicion = require('../models/Posicion');

const getAll = async () => {
    try {
        return await Posicion.findAll();
    } catch (error) {
        throw new Error('Error al obtener las posiciones');
    }
};

const getById = async (id) => {
    try {
        const posicion = await Posicion.findByPk(id);
        if (posicion) {
        return posicion;
        } else {
        throw new Error('Posicion no encontrada');
        }
    } catch (error) {
        throw new Error('Error al obtener la posicion');
    }
};  

const create = async (data) => {
    try {        
        data.fechaAlta = new Date();
        const nuevaPosicion = await Posicion.create(data);        
        return nuevaPosicion;
    } catch (error) {
        throw new Error('Error al crear la posicion');
    }
}

const update = async (id, data) => {
    try {
        const posicion = await Posicion.findByPk(id);
        if (!posicion) {
            throw new Error('Posicion no encontrada');
        }
        const posicionActualizada = await posicion.update(data);
        return posicionActualizada;
    } catch (error) {
        throw new Error('Error al actualizar el posicion');
    }
}

const baja = async (id) => {
    try {
        const posicion = await Posicion.findByPk(id);
        if (!posicion) {
            throw new Error('Posicion no encontrada');
        }
        posicion.fechaBaja = new Date();
        await posicion.save();
        return posicion;
    } catch (error) {
        throw new Error('Error al dar de baja la posicion');
    }
}

const alta = async (id) => {
    try {
        const posicion = await Posicion.findByPk(id);
        if (!posicion) {
            throw new Error('Posicion no encontrada');
        }
        posicion.fechaAlta = new Date();
        posicion.fechaBaja = null;
        await posicion.save();
        return posicion;
    } catch (error) {
        throw new Error('Error al dar de alta la posicion');
    }
}

module.exports = { getAll, getById, create, update, baja, alta };