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

module.exports = {
    getAll,
    getById,
};