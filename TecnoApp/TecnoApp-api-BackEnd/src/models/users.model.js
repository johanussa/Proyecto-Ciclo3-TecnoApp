const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = Schema({
    Codigo: { type: String, require: true },
    Nombre: { type: String, require: true },
    Email: { type: String, require: true },
    Rol: { type: String, require: true },
    Estado: { type: String, require: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);