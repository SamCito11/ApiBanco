const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// GET - Listar todos los usuarios
router.get('/', async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

// POST - Crear usuario
router.post('/', async (req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json(usuario);
});

// PUT - Actualizar usuario
router.put('/:id', async (req, res) => {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuario);
});

// DELETE - Eliminar usuario
router.delete('/:id', async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
});

// Login
router.post('/login', async (req, res) => {
    const { nombreUsuario, password, estado } = req.body;
    const usuario = await Usuario.findOne({ nombreUsuario, estado: 'activo' });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    res.json({ message: 'Login exitoso' });
});

module.exports = router;
