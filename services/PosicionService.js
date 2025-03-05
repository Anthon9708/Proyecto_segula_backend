const Posicion = require('../models/Posicion');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

/**
 * Obtiene todas las posiciones 
 */
const getAll = async () => {
    try {
        return await Posicion.findAll();
    } catch (error) {
        throw new Error('Error al obtener las posiciones');
    }
};

/**
 * Obtiene una posicion por su id 
 */
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

/**
 * Crea una posicion 
 */
const create = async (data) => {
    try {
        data.fechaAlta = new Date();
        const nuevaPosicion = await Posicion.create(data);        
        return nuevaPosicion;
    } catch (error) {
        throw new Error('Error al crear la posicion');
    }
}

/**
 *  Actualiza una posicion 
 */
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

/**
 * Da de baja una posicion  
 */
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

/**
 * Da de alta una posicion 
 */
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

/**
 * Obtiene las posiciones que se modificaron después de la fecha pasada por parámetro 
 */
const findByFecha = async (fecha) => {
    try {    
        const subquery = sequelize.dialect.queryGenerator.selectQuery('posiciones', {
            attributes: [
                'fk_activo',
                [sequelize.fn('MAX', sequelize.col('modificado')), 'max_modificado']
            ],
            where: {
                modificado: {
                    [Op.gt]: fecha
                }
            },
            group: ['fk_activo']
        }).slice(0, -1); 

        const posiciones = await Posicion.findAll({
            where: {
                [Op.and]: [
                    sequelize.literal(`(fk_activo, modificado) IN (${subquery})`)
                ]
            }
        });

        return posiciones;
    } catch (error) {
        console.log(error);
        throw new Error('Error al consultar la posición');
    }
}

/**
 * Obtiene el valor de un campo de la posición  
 */
const getValueByField = async (id, field) => {
    try {
        const posicion = await Posicion.findByPk(id);
        if(!posicion) {
            throw new Error('Posicion no encontrada');
        }
        const value = posicion[String(field)];
        return String(value);
    }catch(error) {
        throw new Error('Error al obtener el valor de la posicion');
    }
}

module.exports = { getAll, getById, create, update, baja, alta, findByFecha , getValueByField};