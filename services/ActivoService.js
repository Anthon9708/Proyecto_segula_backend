const Activo = require('../models/Activo');
const mysql = require('mysql2/promise');
const { Op, sequelize } = require('sequelize');

const getAll = async () => {
    try {
        return await Activo.findAll();
    } catch (error) {
        throw new Error('Error al obtener los activos');
    }
};

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

const create = async (data) => {
    try {
        data.fechaAlta = new Date();
        const nuevoActivo = await Activo.create(data);

        return nuevoActivo;
    } catch (error) {
        throw new Error('Error al crear el activo');
    }
}

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

const findByFecha = async (fecha) => {
    try {
        // const activos = await Activo.findAll({
        //     where: {
        //         creado: {
        //             [Op.gt]: [fecha, fecha2]
        //         }
        //     },
        //     order: [[sequelize.fn('MAX', sequelize.col('creado')), 'DESC']]
          
        // });

        
        console.log(fecha);
        const activos = await Activo.findAll({
            where: {
                fechaAlta: {
                    [Op.gt]: fecha
                }
            },
            attributes: [
                [sequelize.literal(`(
                    SELECT * FROM activos AS a
                    WHERE a.numeroSerie = activos.numeroSerie
                    )`), 'id']
            ],
            // order: [['creado', 'DESC']]
        });

        // const subquery = QueryGenerator.selectQuery('activos', {
        //     attributes: [
        //       'id'
        //     ],
        //     where: {
        //       fechaAlta: {
        //         [Op.gt]: fecha
        //       }
        //     }
        //   });

        console.log(subquery);
    
    } catch (error) {
        throw new Error('Error al consultar el activo');
    }
}

module.exports = { getAll, getById, create, update, baja, alta, findByFecha };