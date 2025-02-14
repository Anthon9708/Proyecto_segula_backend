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

module.exports = {
    getAll,
    getById,
};