const Regla = require('../models/Regla');

const getReglas = async () => {
    try {
        return await Regla.findAll();
    } catch (error) {
        throw new Error('Error al obtener las reglas');
    }
};

const getReglaById = async (id) => {
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
    getReglas,
    getReglaById,
};