const UsersCtrl = {};
const Users = require('../models/users.model');

UsersCtrl.getUsuario = async(req, res) => {
    try {
        Users.find(function (err, users) {        
            if (users) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    users, 
                    message: `Metodo Get Users realizado Correctamente`,
                    msg: 0
                });                
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `No hay Usuarios registrados ${err}`, 
                        msg: 1
                    });
                }                  
            }                        
        });
    } catch (error) {
        res.status(500).send({
            message: `Error al realiza la consula de los usuarios registrados: ${error}`
        });
    } 
}
UsersCtrl.registrarUsuario = async(req, res) => {
    try {
        Users.findOne({ Codigo: req.body.Codigo }, (err, usersBD) => {
            if(!usersBD){  
                const userTemp = req.body;                
                const userData = new Ventas(userTemp);           
                userData.save((err, userRegistrado) => {                    
                    res.status(200).send({
                        userRegistrado,
                        message: 'Usuario registrado Exitosamente',
                        msg: 0                        
                    });                    
                });            
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `El Usuario con codigo ${ req.body.Codigo } ya se encuentra registrado`, 
                        msg: 1
                    });
                }                
            }
        });
    } catch (error) {
        res.status(500).send({
            message: `Error al guardar el nuevo usuario en la base de datos: ${ err } - ${ error }`
        });
    }      
}
UsersCtrl.getOnlyUsuario = async (req, res) => {
    try {   
        const query = { "Codigo" : req.params.id };                          
        Users.findOne(query, (err, userBD) => {            
            if (userBD) {                               
                res.status(200).send({ 
                    userBD, 
                    message: `Busqueda ralizada Correctamente`,
                    msg: 0
                });                
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `No hay usuarios registrados con el ID ${ req.params.id }`,
                        msg: 1
                    });
                }                  
            }
        });
    } catch (error) {
        res.status(500).send({
            message: `Error de conexion a la DB ${ err }, No se pudo Buscar usuario ${ error }`
        });
    }
}
UsersCtrl.updateUsuario = async(req, res) => {
    try {
        const query = { "Codigo": req.body.Codigo };
        const body = req.body;
        Users.findOne(query, (err, user) => {
            if (user) {
                Users.updateOne(query, body, (err, user) => {
                    res.status(200).send({
                        message: `El Usuario con codigo ${ req.body.Codigo } fue correctamente Actualizado`,
                        msg: 0
                    });
                });
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `El Usuario con codigo ${ req.body.Codigo } No se encuentra registrado`, 
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
UsersCtrl.deleteUsuario = async(req, res) => {
    try {
        const query = { "Codigo": req.params.id };             
        Users.findOneAndDelete(query, (err, user) => {
            if (user) {                
                // Si el Id esta registrado continua
                res.status(200).send({                    
                    message: `El Usuario con codigo ${ req.params.id } fue correctamente Eliminado`,
                    msg: 0
                });
            } else {                
                if (res.statusCode == 200) {
                    res.send({
                        message: `El Usuario con codigo ${ req.params.id } No se encuentra registrado`, 
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

module.exports = UsersCtrl;