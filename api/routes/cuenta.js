const express = require('express');
const router = express.Router();
const Cuenta = require('../models/cuenta');

// GET - Listar cuentas
router.get('/', async (req, res) => {
    const cuentas = await Cuenta.find();
    res.json(cuentas);
});

// POST - Crear cuenta
router.post('/', async (req, res) => {
    const cuenta = new Cuenta(req.body);
    await cuenta.save();
    res.json(cuenta);
});

// PUT - Consignar dinero
router.put('/consignar/:numeroCuenta', async (req, res) => {
    const { valor } = req.body;
    const cuenta = await Cuenta.findOne({ numeroCuenta: req.params.numeroCuenta });
    if (valor <= 0) return res.status(400).json({ error: 'El valor debe ser positivo' });
    cuenta.saldo += valor;
    await cuenta.save();
    res.json(cuenta);
});

// PUT - Retirar dinero
router.put('/retirar/:numeroCuenta', async (req, res) => {
    const { valor } = req.body;
    const cuenta = await Cuenta.findOne({ numeroCuenta: req.params.numeroCuenta });
    if (valor > cuenta.saldo) return res.status(400).json({ error: 'Saldo insuficiente' });
    cuenta.saldo -= valor;
    await cuenta.save();
    res.json(cuenta);
});

// DELETE - Eliminar cuenta
router.delete('/:numeroCuenta', async (req, res) => {
    const cuenta = await Cuenta.findOne({ numeroCuenta: req.params.numeroCuenta });
    if (cuenta.saldo !== 0) return res.status(400).json({ error: 'El saldo debe ser cero para eliminar la cuenta' });
    await cuenta.remove();
    res.json({ message: 'Cuenta eliminada' });
});

module.exports = router;
