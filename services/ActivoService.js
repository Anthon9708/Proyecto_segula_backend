const Activo = require('../models/Activo');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

/**
 *  Obtiene todos los activos
 */
const getAll = async () => {
    try {
        return await Activo.findAll();
    } catch (error) {
        throw new Error('Error al obtener los activos');
    }
};

/**
 *  Obtiene un activo por su id
 */
const getById = async (id) => {
    try {
        const activo = await Activo.findByPk(id);
        if (activo) {
        return activo;
        } else {
        throw new Error('Activo no encontrado');
        }
    } catch (error) {
        throw new Error('Error al obtener el activo');
    }
};  

/**
 * Crea un activo
 */
const create = async (data) => {
    try {
        data.fechaAlta = new Date();
        const nuevoActivo = await Activo.create(data);

        return nuevoActivo;
    } catch (error) {
        throw new Error('Error al crear el activo');
    }
}

/**
 * Actualiza un activo 
 */
const update = async (id, data) => {
    try {
        const activo = await Activo.findByPk(id);
        if (!activo) {
            throw new Error('Activo no encontrado');
        }
        const activoActualizado = await activo.update(data);
        return activoActualizado;
    } catch (error) {
        throw new Error('Error al actualizar el activo');
    }
}

/**
 * Da de baja un activo 
 */
const baja = async (id) => {
    try {
        const activo = await Activo.findByPk(id);
        if (!activo) {
            throw new Error('Activo no encontrado');
        }
        activo.fechaBaja = new Date();
        await activo.save();
        return activo;
    } catch (error) {
        throw new Error('Error al dar de baja el activo');
    }
}

/**
 * Da de alta un activo 
 */
const alta = async (id) => {
    try {
        const activo = await Activo.findByPk(id);
        if (!activo) {
            throw new Error('Activo no encontrado');
        }
        activo.fechaAlta = new Date();
        activo.fechaBaja = null;
        await activo.save();
        return activo;
    } catch (error) {
        throw new Error('Error al dar de alta el activo');
    }
}

/**
 * Obtiene los activos que han sido modificados después de una fecha
 */
const findByFecha = async (fecha) => {
    try {    
        const subquery = sequelize.dialect.queryGenerator.selectQuery('activos', {
            attributes: [
                'numero_serie',
                [sequelize.fn('MAX', sequelize.col('modificado')), 'max_fecha_modificado']
            ],
            where: {
                modificado: {
                    [Op.gt]: fecha
                }
            },
            group: ['numero_serie']
        }).slice(0, -1);
        const activos = await Activo.findAll({
            where: {
                [Op.and]: [
                    sequelize.literal(`(numero_serie, modificado) IN (${subquery})`)
                ]
            }
        });
        if(activos.length == 0) {
            
        }

        return activos;
    } catch (error) {
        throw new Error('Error al consultar el activo');
    }
}

/**
 * Obtener el valor de un campo específico de un activo por ID.
 */
const getValueByField =  async (id, field) => {
    try {
        const activo = await Activo.findByPk(id);
        
        if(!activo) {
            throw new Error('Activo no encontrado');
        }
        const value = activo[String(field)];
        return String(value);
    }catch(error) {
        throw new Error('Error al obtener el valor del activo');
    }
}

module.exports = { getAll, getById, create, update, baja, alta, findByFecha , getValueByField};