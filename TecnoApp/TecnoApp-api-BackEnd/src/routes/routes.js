const express = require('express');
const api = express.Router();

const VentasCtrl = require('../controllers/ventas.controller');

api.put('/gestionventas', VentasCtrl.updateVenta);
api.get('/gestionventas', VentasCtrl.getVentas);
api.get('/gestionventas/:id', VentasCtrl.getOnlySale);
api.get('/gestionventas/:key/:value', VentasCtrl.getManySales);
api.post('/gestionventas', VentasCtrl.registrarVenta);
api.delete('/gestionventas/:id', VentasCtrl.deleteVenta);

module.exports = api;