const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ // Habilitar CORS
    origin: ['http://localhost:5173', , 'http://localhost:5174'],// Permitir solicitudes desde tu aplicación React
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Permitir credenciales si es necesario
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log(err));

// Rutas
app.use('/clientes', require('./api/routes/cliente'));
app.use('/usuarios', require('./api/routes/usuario'));
app.use('/cuentas', require('./api/routes/cuenta'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
