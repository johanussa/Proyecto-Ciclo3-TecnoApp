import React from 'react'
import './css/EstiloWelcome.css';

function WelcomePage() {
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
