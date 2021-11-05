const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = Schema({
    Id_Producto: { type: String, require: true },
    Nombre: { type: String, require: true },
    Descripcion: { type: String, require: true },
    Precio: { type: Number, require: true },    
    Estado: { type: String, require: true }    
});

module.exports = mongoose.model('Producto', ProductoSchema);