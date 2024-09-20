const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    documentoCliente: { type: String, required: true, unique: true },
    nombreCompleto: { type: String, required: true },
    celular: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
