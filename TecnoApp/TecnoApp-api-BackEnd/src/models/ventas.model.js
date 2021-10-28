const mongoose = require('mongoose');
const { Schema } = mongoose;

const VentasSchema = new Schema( {
    ID_Venta: { type: Number, required: true },
    ID_Producto: { type: Number, required: true },
    Cantidad: { type: Number, required: true },
    Precio_Unitario: { type: Number, required: true },
    Valor_Total: { type: Number, required: true },
    Fecha_Venta: { type: String, required: true },
    ID_Cliente: { type: Number, required: true },
    Nom_Cliente: { type: String, required: true },
    ID_Vendedor: { type: Number, required: true },
    Nom_Vendedor: { type: String, required: true },    
    Estado_Venta: { type: String, required: true }
});

module.exports = mongoose.model('Ventas', VentasSchema);