const ReglaService = require('../services/ReglaService');
const DatoService  = require('../services/DatoService');

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
        const datosRegla = DatoService.getParamsById(id);//.filter(dato => !dato.fechaBaja);
        //datosRegla = (await datosRegla).filter
        return datosRegla;
    } catch (error) {
      console.error('Error al obtener los datos de la regla:', error);
      return null;
    }
  }

  const generateURL = async (id) => {
    let reglaItem = ReglaService.getById(id);

    if (!reglaItem) {
      throw new Error('Item no encontrado');
    }

    let url = reglaItem.cabecera + '?';
    const datosRegla = await getDatosRegla(id);

    
    console.log("datos de la regla", datosRegla);

    if (!datosRegla || Object.keys(datosRegla).length === 0) {
      throw new Error('datosRegla está vacío o no se ha actualizado correctamente');
    }

    datosRegla.forEach(param => {
      url += `${param['nombre']}=${encodeURIComponent('DATO')}&`;
    });
    url = url.slice(0, -1);
    //console.log(url);
  };

module.exports = { getAll, getById, create, update, baja, alta, generateURL };