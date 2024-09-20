const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estado: { type: String, enum: ['activo', 'inactivo'], required: true }
});

UsuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
