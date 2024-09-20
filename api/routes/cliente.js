const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// GET - Listar todos los clientes
router.get('/', async (req, res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
});

// POST - Crear cliente
router.post('/', async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.json(cliente);
});

// PUT - Actualizar cliente
router.put('/:id', async (req, res) => {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cliente);
});

// DELETE - Eliminar cliente
router.delete('/:id', async (req, res) => {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cliente eliminado' });
});

module.exports = router;
