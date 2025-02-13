const express = require('express');
const sequelize = require('./config/database');
const Dato = require('./models/Dato');

const app = express();
const port = 3000;

app.get('/datos', async (req, res) => {
  try {
    const datos = await Dato.findAll();
    res.json(datos);
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