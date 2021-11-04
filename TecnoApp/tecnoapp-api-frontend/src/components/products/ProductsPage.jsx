import React from 'react';
import LogoProduct from './img/IconProduct.png';
import './css/EstiloProducts.css';

function ProductsPage() {
    return (
        <div className="backColorProduct">
            <div className="container">
                <img id="iconProduct" src={ LogoProduct } alt="Product" />
                <h1 id="titleGesProduct">Gestion de Productos</h1> <br />
            </div>
            <div id="divSearchProduct" className="container border input-group">
                <h5 id="titleSearchProduct">Buscar Producto</h5>  
                <div className="input-group">                    
                    <input id="inputColor" type="text" className="form-control" placeholder="Codigo de Producto" aria-label="Username" 
                        aria-describedby="basic-addon1" />
                    <button type="button" className="input-group-text btn btn-danger" >Buscar</button>
                </div>             
            </div>
            <div className="divTitleProduct">
                <ul id="navtabs" className="nav nav-tabs">
                    <li className="nav-item">
                        <span id="textProduct" className="nav-link active" >Administracion de Productos</span>
                    </li>
                </ul>
            </div> <br /><br />
        </div>
    )
}

export default ProductsPage
