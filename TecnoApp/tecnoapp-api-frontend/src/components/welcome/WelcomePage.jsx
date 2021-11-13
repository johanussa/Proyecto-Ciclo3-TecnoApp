import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './css/EstiloWelcome.css';
import axios from 'axios';

function WelcomePage() {

    const { user, isAuthenticated } = useAuth0();                          

    useEffect(() => {  
        let arrayCodigo = new Uint16Array(1);
        window.crypto.getRandomValues(arrayCodigo);         
        if(isAuthenticated) {                         
            let Codigo = ('UR' + arrayCodigo[0]); let Nombre = user.name; let Email = user.email;
            let Rol = 'Pendiente'; let Estado = 'Pendiente';
            const newuser = { Codigo, Nombre, Email, Rol, Estado };
            axios.post('https://tecnoapp-misiontic.herokuapp.com/api/usuarios/' + Email, newuser)
            .then(res => {
                res.data.msg ? console.log(res.data.message) : console.log(res.data.message); 
            });
        };           
    }, [isAuthenticated, user]);

    return (
        <div id="bodyWelcome"> <br /><br /><br /><br />
            <h1 id="titleMainWel">¡BIENVENIDOS A TECNOAPP!</h1>
            <h5 id="title2Wel">Lider en tecnologia a nivel mundial</h5>
            <p className="parrWelcome parr1">
                Aqui podra encontrar productos de alta calidad, ultimos en tecnologia que podran <br /> 
                acaparar la necesidad que cada uno tenga, le garantizamos altos estandares de calidad y confianza <br />
                de todos nuestros productos. nuestra vision es proporcionar las tecnologías más innovadoras a medida <br />
                de las necesidades empresariales, con el objetivo de incrementar su competitividad y productividad. <br />
                Para ello implementamos soluciones prácticas adaptadas a sus necesidades y desarrollamos nuevas <br />
                soluciones creativas. Nuestra base parte del aprovechamiento de las nuevas redes.
            </p>
            <p className="parrWelcome parr2">
                Queremos estar comprometidos con los problemas de nuestros clientes de forma transparente y eficaz <br />
                para convertirnos en su socio de confianza. En nuestra visión queremos ser una empresa de referencia, <br />
                que camina con el cambio de la tecnología y la sociedad, dando a conocer las posibilidades de los <br />
                estándares y tecnologías libres. Esta labor se debe desempeñar de forma ética y satisfactoria para <br />
                nosotros, nuestros clientes y el resto de la sociedad.
            </p>
        </div>
    )
}

export default WelcomePage
