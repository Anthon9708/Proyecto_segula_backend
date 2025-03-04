const ReglaService = require('../services/ReglaService');
const DatoService = require('../services/DatoService');
const ActivoService = require('../services/ActivoService');
const PosicionService = require('../services/PosicionService');
const DesencadenanteService = require('../services/DesencadenanteService');
const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');

const getAll = async (req, res) => {
    try {
        const reglas = await ReglaService.getAll();
        res.json(reglas);
    } catch (error) {
        res.status(500).send('Error al obtener las reglas');
    }
};

const getById = async (req, res) => {
    try {
        const regla = await ReglaService.getById(req.params.id);
        res.json(regla);
    } catch (error) {
        console.error('Error al obtener la regla:', error);
        res.status(500).send(error.message);
    }
};

const create = async (req, res) => {
    try {
        const nuevaRegla = await ReglaService.create(req.body);
        res.status(201).json(nuevaRegla);
    } catch (error) {
        console.error('Error al crear la regla:', error);
        res.status(500).send(error.message);
    }
}

const update = async (req, res) => {
    try {
        const reglaActualizada = await ReglaService.update(req.params.id, req.body);
        res.json(reglaActualizada);
    } catch (error) {
        console.error('Error al actualizar la regla:', error);
        res.status(500).send(error.message);
    }
}

const baja = async (req, res) => {
    try {
        const reglaActualizada = await ReglaService.baja(req.params.id);
        res.json(reglaActualizada);
    } catch (error) {
        console.error('Error al dar de baja la regla:', error);
        res.status(500).send(error.message);
    }
}

const alta = async (req, res) => {
    try {
        const reglaActualizada = await ReglaService.alta(req.params.id);
        res.json(reglaActualizada);
    } catch (error) {
        console.error('Error al dar de alta la regla:', error);
        res.status(500).send(error.message);
    }
}

async function getDatosRegla(id) {
    try {
        const datosRegla = await DatoService.getParamsById(id);
        return datosRegla;
    } catch (error) {
        console.error('Error al obtener los datos de la regla:', error);
        return null;
    }
}

const getValue = async (id,param) => {
    try {
        let value = null;
        if (param['datosMaestros'].origen === 'Activos') {
            value = await ActivoService.getValueByField( id ,param['datosMaestros'].nombre);
        }
        if (param['datosMaestros'].origen === 'Posiciones') {
            value = await PosicionService.getValueByField( id ,param['datosMaestros'].nombre);
        }
        return value;
    } catch (error) {
        console.error('Error al obtener el valor del parámetro:', error);
        return null;
    }
}

const generateURL = async (id , regla) => {
    try {
        if (!regla) {
            throw new Error('Item no encontrado');
        }
        let url = regla.cabecera + '?';
        const datosRegla = await getDatosRegla(regla.id);

        if (!datosRegla || Object.keys(datosRegla).length === 0) {
            throw new Error('datosRegla está vacío o no se ha actualizado correctamente');
        }
        for (const param of datosRegla) {
            const value = await getValue(id, param); // Usa await aquí
            url += `${param['datosMaestros'].nombre}=${encodeURIComponent(value)}&`;
        }
        url = url.slice(0, -1);
        return url;
    } catch (error) {
        console.error('Error al generar la URL:', error);
    }

};


const procesarReglas = async(fechaActivos, fechaPosiciones) => {
    let urls = [];
    const formattedFechaActivos = formatDate(fechaActivos);
    const formattedFechaPosiciones = formatDate(fechaPosiciones);
    const reglas = await ReglaService.getAll();
    const reglasFiltradas = reglas.filter(regla => !regla.fechaBaja);
    for (const regla of reglasFiltradas) {
        try {
            let desencadenante = await DesencadenanteService.getById(regla.desencadenante);
            let query = desencadenante.query + " AND modificado > '";
            query += (desencadenante.tabla == 'activos') ? formattedFechaActivos : formattedFechaPosiciones;
            query += "';";
    
            const results = await sequelize.query(`SELECT * FROM ${desencadenante.tabla} WHERE ${query}`, { type: Sequelize.QueryTypes.SELECT });
    
            for (const elemento of results) {
                try {
                    const urlGenerada = await generateURL(elemento.id, regla);
                    urls.push(urlGenerada);
                } catch (error) {
                    console.error('Error al generar la URL:', error);
                }
            }
        } catch (error) {
            console.error('Error ejecutando la consulta:', error);
        }
    }

    return urls;
};

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = { getAll, getById, create, update, baja, alta, generateURL, procesarReglas };