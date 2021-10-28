const VentaCtrl = {};
const Ventas = require('../models/sales.model');

VentaCtrl.getVentas = async (req, res) => {
    try {
        Ventas.find(function (err, ventas) {        
            if (ventas) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    ventas, 
                    message: `Metodo Get realizado Correctamente`,
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
        const query = { "Id_Venta" : req.params.id };               
        Ventas.findOne(query, (err, venta) => {
            if (venta) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    venta, 
                    message: `Busqueda realizada Correctamente`,
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
            if (req.params.key == "Id_Cliente") {
                query = { "Id_Cliente" : req.params.value };
            } else {
                if(req.params.key == "Id_Vendedor"){
                    query = { "Id_Vendedor" : req.params.value };
                }                
            }
        } 
        Ventas.find(query, (err, ventas) => {            
            if (ventas) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    ventas, 
                    message: `Metodo Get realizado Correctamente`,
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
        const query = { "Id_Venta" : req.body.Id_Venta }
        Ventas.findOne(query, (err, salesBD) => {
            if(!salesBD){  
                const ventasTemp = req.body;                
                const ventaARegistrar = new Ventas(ventasTemp);           
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
                        message: `La venta con codigo ${ req.body.Id_Venta } ya se encuentra registrada`, 
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
        const query = { "Id_Venta": req.body.Id_Venta };
        const body = req.body;
        Ventas.findOne(query, (err, venta) => {
            if (venta) {
                Ventas.updateOne(query, body, (err, venta) => {
                    res.status(200).send({
                        message: `La venta con ID ${ req.body.Id_Venta } fue correctamente Actualizada`,
                        msg: 0
                    });
                });
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `La venta con ID ${ req.body.Id_Venta } No se encuentra registrada`, 
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
        const query = { "Id_Venta": req.params.id };             
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
        });                
    } catch (error) {
        res.status(500).send({
            message: `Error de conexion a la DB ${ err }, No se pudo Eliminar ${ error }`
        });
    }
}

module.exports = VentaCtrl;