const Desencadenante = require('../models/Desencadenante');

const getAll = async () => {
    try {
        return await Desencadenante.findAll();
    } catch (error) {
        throw new Error('Error al obtener los desencadenantes');
    }
};

const getById = async (id) => {
    try {
        const desencadenante = await Desencadenante.findByPk(id);
        if (desencadenante) {
        return desencadenante;
        } else {
        throw new Error('Desencadenante no encontrado');
        }
    } catch (error) {
        throw new Error('Error al obtener el desencadenante');
    }
};  

const create = async (data) => {
    try {
        const nuevoDesencadenante = await Desencadenante.create(data);        
        return nuevoDesencadenante;
    } catch (error) {
        throw new Error('Error al crear el desencadenante');
    }
}

const update = async (id, data) => {
    try {
        const desencadenante = await Desencadenante.findByPk(id);
        if (!desencadenante) {
            throw new Error('Desencadenante no encontrado');
        }
        const desencadenanteActualizado = await desencadenante.update(data);
        return desencadenanteActualizado;
    } catch (error) {
        throw new Error('Error al actualizar el desencadenante');
    }
}

module.exports = { getAll, getById, create, update};