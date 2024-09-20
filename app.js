const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Asegúrate de tener esta librería instalada
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configuración de CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Agrega todos los orígenes que necesites
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true, // Permite enviar cookies o datos de autenticación
};

app.use(cors(corsOptions)); // Aplicar las opciones de CORS

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
