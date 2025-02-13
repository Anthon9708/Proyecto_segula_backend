const express = require('express');
const sequelize = require('./config/database');
const Dato = require('./models/Dato');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/datos', async (req, res) => {
  try {
    const datos = await Dato.findAll();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/datos/:id', async (req, res) => {
  try {
    const dato = await Dato.findByPk(req.params.id);
    if (dato) {
      res.json(dato);
    } else {
      res.status(404).send('Dato no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el dato:', error);
    res.status(500).send('Error al obtener el dato');
  }
});

app.post('/datos', async (req, res) => {
  try {
    const nuevoDato = await Dato.create(req.body);
    res.status(201).json(nuevoDato);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});