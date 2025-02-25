const ReglaService = require('../services/ReglaService');
const DatoService = require('../services/DatoService');
const ActivoService = require('../services/ActivoService');
const PosicionService = require('../services/PosicionService');

const getAll = async (req, res) => {
    try {
        const reglas = await ReglaService.getAll();
        res.json(reglas);
    } catch (error) {
        console.error('Error al obtener los reglas:', error);
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


function getDatosRegla(id) {
    try {
        const datosRegla = DatoService.getParamsById(id);
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
            console.log(value);
            url += `${param['datosMaestros'].nombre}=${encodeURIComponent(value)}&`;
        }
        url = url.slice(0, -1);
        console.log(url);
    } catch (error) {
        console.error('Error al generar la URL:', error);
    }

};

module.exports = { getAll, getById, create, update, baja, alta, generateURL };