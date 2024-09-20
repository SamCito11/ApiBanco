const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configuración de CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Orígenes permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true, // Habilitar el envío de cookies
};

// Usa CORS
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Manejo de preflight requests

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
