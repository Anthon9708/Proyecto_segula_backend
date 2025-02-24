const Log = require('../models/Log');

const getAll = async () => {
    try {
        return await Log.findAll();
    } catch (error) {
        throw new Error('Error al obtener los logs');
    }
};

const getById = async (id) => {
    try {
        const log = await Log.findByPk(id);
        if (log) {
        return log;
        } else {
        throw new Error('Log no encontrado');
        }
    } catch (error) {
        throw new Error('Error al obtener el log');
    }
};  

const create = async (data) => {
    try {        
        data.fechaAlta = new Date();
        const nuevoLog = await Log.create(data);        
        return nuevoLog;
    } catch (error) {
        throw new Error('Error al crear el log');
    }
}

const update = async (id, data) => {
    try {
        const log = await Log.findByPk(id);
        if (!log) {
            throw new Error('Log no encontrado');
        }
        const logActualizado = await log.update(data);
        return logActualizado;
    } catch (error) {
        throw new Error('Error al actualizar el log');
    }
}

const baja = async (id) => {
    try {
        const log = await Log.findByPk(id);
        if (!log) {
            throw new Error('Log no encontrado');
        }
        log.fechaBaja = new Date();
        await log.save();
        return log;
    } catch (error) {
        throw new Error('Error al dar de baja el log');
    }
}

const alta = async (id) => {
    try {
        const log = await Log.findByPk(id);
        if (!log) {
            throw new Error('Log no encontrado');
        }
        log.fechaAlta = new Date();
        log.fechaBaja = null;
        await log.save();
        return log;
    } catch (error) {
        throw new Error('Error al dar de alta el log');
    }
}

const getFechas = async () => {
    try {
        const log = await Log.findOne({
            attributes: ['activos', 'posiciones'],
            order: [['creado', 'DESC']]
        });
        return { activos: log.activos, posiciones: log.posiciones };
    } catch (error) {
        throw new Error('Error al obtener las fechas');
    }
};

module.exports = { getAll, getById, create, update, baja, alta, getFechas };