const VentaCtrl = {};
const Ventas = require('../models/ventas.model');

VentaCtrl.getVentas = async (req, res) => {
    try {
        Ventas.find(function (err, ventas) {        
            if (ventas) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    ventas, 
                    message: `Metodo Get ralizado Correctamente`,
                    msg: 0
                });                
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `No hay ventas registradas ${err}`, 
                        msg: 1
                    });
                }                  
            }                        
        });
    } catch (error) {
        res.status(500).send({
            message: `Error al realiza la consula de las ventas registradas: ${error}`
        });
    }    
}

VentaCtrl.getOnlySale = async (req, res) => {
    try {        
        const query = { "ID_Venta" : req.params.id };               
        Ventas.findOne(query, (err, venta) => {
            if (venta) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    venta, 
                    message: `Busqueda ralizada Correctamente`,
                    msg: 0
                });                
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `No hay ventas registradas con el ID ${ req.params.id }`, 
                        msg: 1
                    });
                }                  
            }
        })
    } catch (error) {
        res.status(500).send({
            message: `Error de conexion a la DB ${ err }, No se pudo Buscar Venta ${ error }`
        });
    }
}

VentaCtrl.getManySales = async (req, res) => {
    try {   
        let query = {};            
        if (req.params.key == "Fecha_Venta") {
            query = { "Fecha_Venta" : req.params.value };
        } else {
            if (req.params.key == "ID_Cliente") {
                query = { "ID_Cliente" : req.params.value };
            } else {
                if(req.params.key == "ID_Vendedor"){
                    query = { "ID_Vendedor" : req.params.value };
                }                
            }
        }
        Ventas.find(query, (err, ventas) => {            
            if (ventas) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    ventas, 
                    message: `Metodo Get ralizado Correctamente`,
                    msg: 0
                });                
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `No hay ventas registradas con ese parametro ${query}`, 
                        msg: 1
                    });
                }                  
            }     
        })
    } catch (error) {
        res.status(500).send({
            message: `Error al realiza la consulta de las ventas registradas: ${error}`
        });
    }
}

VentaCtrl.registrarVenta = async (req, res) => {    
    try {
        Ventas.findOne({ ID_Venta: req.body.ID_Venta }, (err, ventasEnBaseDeDatos) => {
            if(!ventasEnBaseDeDatos){  // Si no se encuentra la venta se guarda               
                let ventasTemp = {
                    ID_Venta : req.body.ID_Venta,
                    ID_Producto: req.body.ID_Producto,
                    Cantidad: req.body.Cantidad,
                    Precio_Unitario: req.body.Precio_Unitario,                
                    Valor_Total: req.body.Valor_Total,          
                    Fecha_Venta: req.body.Fecha_Venta,                
                    ID_Cliente: req.body.ID_Cliente,                
                    Nom_Cliente: req.body.Nom_Cliente,                
                    Nom_Vendedor: req.body.Nom_Vendedor,                
                    ID_Vendedor: req.body.ID_Vendedor,                
                    Estado_Venta: req.body.Estado_Venta                
                }
                let ventaARegistrar = new Ventas(ventasTemp);
           
                ventaARegistrar.save((err, ventaRegistrada) => {                    
                    res.status(200).send({
                        ventaRegistrada,
                        message: 'Venta registrada Exitosamente',
                        msg: 0                        
                    });                    
                });            
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `La venta con codigo ${ req.body.ID_Venta } ya se encuentra registrada`, 
                        msg: 1
                    });
                }                
            }
        });
    } catch (error) {
        res.status(500).send({
            message: `Error al guardar una nueva venta en la base de datos: ${ err } - ${ error }`
        });
    }      
}

VentaCtrl.updateVenta = (req, res) => {
    try {
        const query = { "ID_Venta": req.body.ID_Venta };
        const body = req.body;
        Ventas.findOne(query, (err, venta) => {
            if (venta) {
                Ventas.updateOne(query, body, (err, venta) => {
                    res.status(200).send({
                        message: `La venta con ID ${ req.body.ID_Venta } fue correctamente Actualizada`,
                        msg: 0
                    });
                });
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `La venta con ID ${ req.body.ID_Venta } No se encuentra registrada`, 
                        msg: 1
                    });
                }                  
            }
        });
    } catch (error) {
        res.status(500).send({
            message: `Error de conexion a la DB ${ error }, No se pudo Actualizar ${ err }`
        });
    }
}

VentaCtrl.deleteVenta = (req, res) => {
    try {
        const query = { "ID_Venta": req.params.id };             
        Ventas.findOneAndDelete(query, (err, venta) => {
            if (venta) {                
                // Si el Id esta registrado continua
                res.status(200).send({                    
                    message: `La venta con ID ${ req.params.id } fue correctamente Eliminada`,
                    msg: 0
                });
            } else {                
                if (res.statusCode == 200) {
                    res.send({
                        message: `La venta con ID ${ req.params.id } No se encuentra registrada`, 
                        msg: 1
                    });                    
                }                                                
            }            
        })                
    } catch (error) {
        res.status(500).send({
            message: `Error de conexion a la DB ${ err }, No se pudo Eliminar ${ error }`
        });
    }
}

module.exports = VentaCtrl;