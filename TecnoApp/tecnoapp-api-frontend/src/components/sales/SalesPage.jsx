import React from 'react';
import LogoSales from './img/IconSales.png';
import './css/EstiloSales.css';

function SalesPage() {
    return (
        <div className="backColorSales">
            <div className="container">
                <img id="iconSale" src={ LogoSales } alt="Product" />
                <h1 id="titleGesSale">Gestion de Ventas</h1> <br />
            </div>
            <div id="divSearchSale" className="container border input-group">
                <h5 id="titleSearchSale">Buscar Venta</h5>  
                <div className="input-group">                    
                    <input id="inputColorSale" type="text" className="form-control" placeholder="Codigo de Venta" aria-describedby="basic-addon1" />
                    <button type="button" className="input-group-text btn btn-success" >Buscar</button>
                </div>             
            </div>
            <div className="divTitleSale">
                <ul id="navTabsSale" className="nav nav-tabs">
                    <li className="nav-item">
                        <span id="textSale" className="nav-link active" >Administracion de Ventas</span>
                    </li>
                </ul>
            </div> <br /><br />
        </div>
    )
}

export default SalesPage
