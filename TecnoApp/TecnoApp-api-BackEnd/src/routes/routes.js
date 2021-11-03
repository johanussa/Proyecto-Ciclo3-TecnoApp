const express = require('express');
const api = express.Router();

const SalesCtrl = require('../controllers/sales.controller');
const ProductsCtrl = require('../controllers/products.controller');
const UsersCtrl = require('../controllers/users.controller');

api.get('/gestionventas', SalesCtrl.getVentas);
api.put('/gestionventas', SalesCtrl.updateVenta);
api.get('/gestionventas/:id', SalesCtrl.getOnlySale);
api.post('/gestionventas', SalesCtrl.registrarVenta);
api.delete('/gestionventas/:id', SalesCtrl.deleteVenta);
api.get('/gestionventas/:key/:value', SalesCtrl.getManySales);

api.get('/productos', ProductsCtrl.getProducto);
api.put('/productos', ProductsCtrl.updateProducto );
api.post('/productos', ProductsCtrl.registrarProducto);
api.get('/productos/:id', ProductsCtrl.getOnlyProduct);
api.delete('/productos/:id', ProductsCtrl.deleteProducto );

api.get('/usuarios', UsersCtrl.getUsuario);
api.put('/usuarios', UsersCtrl.updateUsuario );
api.post('/usuarios/:email', UsersCtrl.registrarUsuario);
api.get('/usuarios/:id', UsersCtrl.getOnlyUsuario);
api.delete('/usuarios/:id', UsersCtrl.deleteUsuario );

module.exports = api;