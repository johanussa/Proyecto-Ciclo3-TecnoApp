const ProductoCtrl = {};
const Producto = require('../models/products.model');

ProductoCtrl.getProducto = async (req, res) => {
    try {
        Producto.find(function(err, productos) {
            if (productos) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    productos, 
                    message: `Metodo Get Productos realizado Correctamente`,
                    msg: 0
                });                
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `No hay Productos registradas ${err}`, 
                        msg: 1
                    });
                }                  
            } 
        });
    } catch (error) {
        res.status(500).send({
            message: `Error de conexion a la DB ${ err }, No se pudo Buscar producto ${ error }`
        });
    }
}
ProductoCtrl.getOnlyProduct = async (req, res) => {
    try {   
        const query = { "Id_Producto": req.params.id };                         
        Producto.findOne(query, (err, productoBD) => {            
            if (productoBD) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    productoBD, 
                    message: `Busqueda ralizada Correctamente`,
                    msg: 0
                });                
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `No hay productos registradas con el ID ${ req.params.id }`,
                        msg: 1
                    });
                }                  
            }
        });
    } catch (error) {
        res.status(500).send({
            message: `Error de conexion a la DB ${ err }, No se pudo Buscar producto ${ error }`
        });
    }
}
ProductoCtrl.registrarProducto = async(req, res) => {
    try {
        const query = { "Id_Producto" : req.body.Id_Producto };
        Producto.findOne(query, (err, productoBD) => {
            if(!productoBD){  
                const prodTemp = req.body;                
                const dataProducto = new Producto(prodTemp);           
                dataProducto.save((err, prodRegistrado) => {                    
                    res.status(200).send({
                        prodRegistrado,
                        message: 'Producto registrado Exitosamente',
                        msg: 0                        
                    });                    
                });            
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `El Producto con codigo ${ req.body.Id_Producto } ya se encuentra registrado`, 
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
ProductoCtrl.updateProducto = async ( req, res ) => {    
    try {
        const query = { "Id_Producto": req.body.Id_Producto };
        const productoActualizar = req.body;        
        Producto.findOne(query, (err, prod) => {
            if (prod) {
                Producto.updateOne(query, productoActualizar, (err, prod) => {
                    res.status(200).send({
                        message: `El Producto con ID ${ req.body.Id_Producto } fue correctamente Actualizado`,
                        msg: 0
                    });
                });
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `El Producto con ID ${ req.body.Id_Producto } No se encuentra registrado`, 
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
ProductoCtrl.deleteProducto = async(req, res) => {
    try {
        const query = { "Id_Producto": req.params.id };             
        Producto.findOneAndDelete(query, (err, prod) => {
            if (prod) {                
                // Si el Id esta registrado continua
                res.status(200).send({                    
                    message: `El producto con ID ${ req.params.id } fue correctamente Eliminado`,
                    msg: 0
                });
            } else {                
                if (res.statusCode == 200) {
                    res.send({
                        message: `El producto con ID ${ req.params.id } No se encuentra registrado`, 
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

module.exports = ProductoCtrl;