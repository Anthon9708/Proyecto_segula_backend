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

module.exports = {
    getAll,
    getById,
};