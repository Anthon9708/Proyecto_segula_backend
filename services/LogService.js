const Log = require('../models/Log');

/**
 * Obtiene todos los logs 
 */
const getAll = async () => {
    try {
        return await Log.findAll();
    } catch (error) {
        throw new Error('Error al obtener los logs');
    }
};

/**
 * Obtiene un log por su id 
 */
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

/**
 * Crea un log 
 */
const create = async (data) => {
    try {        
        data.fechaAlta = new Date();
        const nuevoLog = await Log.create(data);        
        return nuevoLog;
    } catch (error) {
        throw new Error('Error al crear el log');
    }
}

/**
 * Actualiza un log 
 */
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

/**
 * Da de baja un log 
 */
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

/**
 * Da de alta un log 
 */
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

/**
 * Obtiene las fechas de los logs de activos y posiciones 
 */
const getFechas = async () => {
    try {
        const log = await Log.findOne({
            attributes: ['activos', 'posiciones'],
            order: [['creado', 'DESC']]
        });
        if (!log) {
            return { fechaActivos: Date.now(), fechaPosiciones: Date.now() };
        }
        return { fechaActivos: log.activos, fechaPosiciones: log.posiciones };
    } catch (error) {
        throw new Error('Error al obtener las fechas');
    }
};

module.exports = { getAll, getById, create, update, baja, alta, getFechas };