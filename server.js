const express = require('express');
const path = require('path');  // Importa el módulo 'path'
const axios = require('axios');

const app = express();
const port = 3001;

// Usa el módulo 'path' para construir la ruta del archivo 'public'
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/mascotas', async (req, res) => {
  try {
    // Llamada a la API para obtener razas de perros
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    const razas = response.data.message;

    // Construir un array de objetos con la información necesaria
    const mascotas = Object.keys(razas).map(raza => {
      return {
        nombre: raza,
        subrazas: razas[raza]
      };
    });

    res.json(mascotas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener mascotas' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
