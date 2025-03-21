const Dato = require('../models/Dato');
const DatoMaestro = require('../models/DatoMaestro');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

/**
 * Obtiene todos los datos 
 */
const getAll = async () => {
    try {
        return await Dato.findAll();
    } catch (error) {
        throw new Error('Error al obtener los datos');
    }
};

/**
 * Obtiene un dato por su id 
 */
const getById = async (id) => {
    try {
        const dato = await Dato.findByPk(id);
        if (dato) {
        return dato;
        } else {
        throw new Error('Dato no encontrado');
        }
    } catch (error) {
        throw new Error('Error al obtener el dato');
    }
};  

/**
 * Crea un dato 
 */
const create = async (data) => {
    try {        
        data.fechaAlta = new Date();
        const nuevoDato = await Dato.create(data);        
        return nuevoDato;
    } catch (error) {
        throw new Error('Error al crear el dato');
    }
}

/**
 * Actualiza un dato 
 */
const update = async (id, data) => {
    try {
        const dato = await Dato.findByPk(id);
        if (!dato) {
            throw new Error('Dato no encontrado');
        }
        const datoActualizado = await dato.update(data);
        return datoActualizado;
    } catch (error) {
        throw new Error('Error al actualizar el dato');
    }
}

/**
 * Obtiene los datos por campos específ 
 */
const getByFields = async (fields) => {
    try {
        return await Dato.findAll({
            where: fields
        });
    } catch (error) {
        throw new Error('Error al obtener los datos');
    }
}

/**
 * Obtiene los datos por id de regla 
 */
const getByIdRegla = async (idRegla) => {
    try {
        return await Dato.findAll({
            where: {
                regla: idRegla
            }
        });
    } catch (error) {
        throw new Error('Error al obtener los datos');
    }
}

/**
 * Crea o actualiza los datos por id de regla 
 */
const createOrUpdateByIdRegla = async (dataArray) => {
    const transaction = await sequelize.transaction();
    try {
        const updatedDatos = [];
        const idsInDataArray = dataArray.map(data => data.id).filter(id => id);

        // Obtener todos los datos que coincidan con la regla
        const existingDatos = await Dato.findAll({
            where: {
                regla: dataArray[0].regla
            },
            transaction
        });

        for (const data of dataArray) {
            const { id, ...updateData } = data;
            if (!id) {
                updateData.fechaAlta = new Date();
                const nuevoDato = await Dato.create(updateData, { transaction });
                updatedDatos.push(nuevoDato);
            } else {
                const dato = await Dato.findByPk(id, { transaction });
                if (!dato) {
                    throw new Error(`Dato con id ${id} no encontrado`);
                }
                const updatedDato = await dato.update(updateData, { transaction });
                updatedDatos.push(updatedDato);
            }
        }
        
        // Establecer fechaBaja para los datos que no están en dataArray
        for (const dato of existingDatos) {
            if (!idsInDataArray.includes(dato.id)) {
                dato.fechaBaja = new Date();
                await dato.save({ transaction });
            }
        }
        await transaction.commit();
        return updatedDatos;
    } catch (error) {
        await transaction.rollback();
        throw new Error('Error al actualizar los datos');
    }
}

const bajaAllByIdRegla= async (idRegla) => {
    const transaction = await sequelize.transaction();
    try {
        // Obtener todos los datos que coincidan con la regla
        const existingDatos = await Dato.findAll({
            where: {
                regla: idRegla
            },
            transaction
        });

        // Establecer fechaBaja para los datos que no están en dataArray
        for (const dato of existingDatos) {
            dato.fechaBaja = new Date();
            await dato.save({ transaction });
        }
        await transaction.commit();
        return idRegla;
    } catch (error) {
        await transaction.rollback();
        throw new Error('Error al actualizar los datos');
    }
}

/**
 * Obtiene los datos por id de regla  
 */
const getParamsById = async (id) => {
    try {
        const datos = await Dato.findAll({
            where: { 
                regla: id ,
                fechaBaja: {
                    [Op.is]: null
                },
            },
            include: {
                model: DatoMaestro
            }
        });
        return datos.map(dato => ({
            datosMaestros: dato.DatoMaestro
        }));
    } catch (error) {
        throw new Error('Error al obtener los datos');
    }
}

/**
 * Da de baja un dato  
 */
const baja = async (id) => {
    try {
        const dato = await Dato.findByPk(id);
        if (!dato) {
            throw new Error('Dato no encontrado');
        }
        dato.fechaBaja = new Date();
        await dato.save();
        return dato;
    } catch (error) {
        throw new Error('Error al dar de baja el dato');
    }
}

/**
 * Da de alta 
 */
const alta = async (id) => {
    try {
        const dato = await Dato.findByPk(id);
        if (!dato) {
            throw new Error('Dato no encontrado');
        }
        dato.fechaAlta = new Date();
        dato.fechaBaja = null;
        await dato.save();
        return dato;
    } catch (error) {
        throw new Error('Error al dar de alta el dato');
    }
}

module.exports = { getAll, getById, create, update, getByFields, getByIdRegla, createOrUpdateByIdRegla, bajaAllByIdRegla, getParamsById, baja, alta };