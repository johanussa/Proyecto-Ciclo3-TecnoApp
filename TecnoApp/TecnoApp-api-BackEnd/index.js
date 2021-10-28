const mongoose = require('mongoose');
const app = require('./app');
const config = require('./src/database/config');

mongoose.connect(config.db, {     
    useNewUrlParser: true,
    useUnifiedTopology: true
})  
    .then(db => console.log("Base de datos Conectada Correctamente"))    
    .catch(error => console.log("Error de Conexion ", error));

    app.listen(config.port, () => {
        console.log(`Api Rest corriendo en el puerto #${ config.port }`);
    });