const express = require('express');
const api = express.Router();

const SalesCtrl = require('../controllers/sales.controller');
const ProductsCtrl = require('../controllers/products.controller');
const UsersCtrl = require('../controllers/users.controller');

api.put('/gestionventas', SalesCtrl.updateVenta);
api.get('/gestionventas', SalesCtrl.getVentas);
api.get('/gestionventas/:id', SalesCtrl.getOnlySale);
api.get('/gestionventas/:key/:value', SalesCtrl.getManySales);
api.post('/gestionventas', SalesCtrl.registrarVenta);
api.delete('/gestionventas/:id', SalesCtrl.deleteVenta);

api.get('/productos', ProductsCtrl.getProducto);
api.post('/productos', ProductsCtrl.registrarProducto);
api.get('/productos/:id', ProductsCtrl.getOnlyProduct);
api.put('/productos/:producto_id', ProductsCtrl .updateProducto );
api.delete('/productos/:producto_id', ProductsCtrl .deleteProducto );

api.get('/usuarios', UsersCtrl.getUsuario);
api.get('/usuarios/:id', UsersCtrl.getOnlyUsuario);
api.post('/usuarios', UsersCtrl.registrarUsuario);
api.put('/usuarios', UsersCtrl .updateUsuario );
api.delete('/usuarios/:id', UsersCtrl .deleteUsuario );

module.exports = api;