const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CuentaSchema = new mongoose.Schema({
    numeroCuenta: { type: Number, unique: true, required: true, autoIncrement: true },
    documentoCliente: { type: String, required: true },
    fechaApertura: { type: Date, default: Date.now },
    saldo: { type: Number, default: 0 },
    claveAcceso: { type: String, required: true }
});

CuentaSchema.pre('save', async function(next) {
    if (!this.isModified('claveAcceso')) return next();
    this.claveAcceso = await bcrypt.hash(this.claveAcceso, 10);
    next();
});

module.exports = mongoose.model('Cuenta', CuentaSchema);
