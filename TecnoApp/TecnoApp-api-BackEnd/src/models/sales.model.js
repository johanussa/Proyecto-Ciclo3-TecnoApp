const mongoose = require('mongoose');
const { Schema } = mongoose;

const VentasSchema = new Schema( {
    Id_Venta: { type: String, required: true },
    Productos : [{
        Id_Producto: { type: String, required: true },
        Nombre: { type: String, required: true },
        Descripcion: { type: String, required: true },
        Cantidad: { type: Number, required: true },
        Precio: { type: Number, required: true },        
        Total: { type: Number, required: true }        
    }],    
    Valor_Total: { type: Number, required: true },
    Fecha_Venta: { type: String, required: true },
    Id_Cliente: { type: Number, required: true },
    Nom_Cliente: { type: String, required: true },
    Id_Vendedor: { type: Number, required: true },
    Nom_Vendedor: { type: String, required: true },    
    Estado_Venta: { type: String, required: true }
});

module.exports = mongoose.model('Ventas', VentasSchema);