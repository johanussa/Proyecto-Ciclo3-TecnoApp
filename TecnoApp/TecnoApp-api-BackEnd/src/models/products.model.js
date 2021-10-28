const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = Schema({
    Id_Producto: { type: Number, require: true },
    Descripcion: { type: String, require: true },
    Precio: { type: Number, require: true },
    Cantidad: { type: Number, require: true },
    Estado: { type: String, require: true }    
});

module.exports = mongoose.model('Producto', ProductoSchema);