import React, { useState, useEffect } from 'react';
import LogoSales from './img/IconSales.png';
import IconCancel from './img/IconCancel.png';
import './css/EstiloSales.css';
import axios from 'axios';

function SalesPage() {

    const [Id_Venta, setId_Venta] = useState(0);   
    const [render, setRender] = useState(0); 
    const [dataProducts, setDataProducts] = useState([]);  
    const [dataOneProduct, setDataOneProduct] = useState([]);  
    const [falgID, setFlagID] = useState(0);

    useEffect(() => { 
        axios.get('http://localhost:3001/api/productos')
        .then(res => {
            const products = res.data.productos;                      
            setDataProducts( products );          
            console.log(res.data.message);
        }); 
    }, [render]);

    function generatorID() {
        let arrayCodigo = new Uint16Array(1);
        window.crypto.getRandomValues(arrayCodigo); 
        const idGener = ('RV' + arrayCodigo[0]);
        setId_Venta( idGener );
        setFlagID(true);
    } 
    const addSale = async => {

    }
    function dataAdd(id) {
        dataProducts.map( product => {
            if(product.Id_Producto == id) {
                dataOneProduct.push({
                    Id_Producto : product.Id_Producto,
                    Nombre : product.Nombre,
                    Descripcion : product.Descripcion,
                    Cantidad : 1,
                    Precio : product.Precio,
                    Total : product.Precio
                });
                setDataOneProduct(dataOneProduct);
                setRender(render +1);
            }            
        });          
    } 
    function updateData(cant, precio, id) {        
        dataOneProduct.map( product => {
            if(product.Id_Producto == id) {
                product.Cantidad = cant;
                product.Total = precio * cant;
                setRender(render +1);
            } 
        });
    }
    function deleteDataArray(id) {
        let indice;
        for (let i = 0; i < dataOneProduct.length; i++) {
            if(dataOneProduct[i].Id_Producto == id) {
                indice = i; break;
            }            
        }
        dataOneProduct.splice(indice, 1);
        setRender(render +1);
    }
    return (
        <div className="backColorSales">
            <div className="container">
                <img id="iconSale" src={ LogoSales } alt="Product" />
                <h1 id="titleGesSale">Gestion de Ventas</h1> <br />
            </div>
            <div id="divSearchSale" className="container border input-group">
                <h5 id="titleSearchSale">Buscar Venta</h5>  
                <div className="input-group">                    
                    <input id="inputColorSale" type="text" className="form-control" 
                        placeholder="Codigo de Venta" aria-describedby="basic-addon1" />
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
            <div className="container border">
                <form className="row g-3 m-4 mt-2">
                    <legend>Registro de Ventas</legend>
                    <div className="col-md-6">
                        <label for="inputID" className="form-label">Identificador Venta</label>
                        <input readOnly type="text" className="form-control" id="inputID" onClick={ generatorID }
                            placeholder={ falgID ? Id_Venta : "Da click aqui para generar el ID de Venta" } />
                    </div>
                    <div className="col-md-6">
                        <label for="inputState" className="form-label">Agregar Productos</label>
                        <select id="inputState" className="form-select" onChange={ e => dataAdd(e.target.value) } >
                            <option defaultValue>Elige los Productos de la lista...</option>
                            { dataProducts.map( product => 
                                <option value={ product.Id_Producto }>{ product.Nombre }</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <div className="container border">
                            <legend className="m-3">Productos Agregados</legend>
                            <table className="table table-success table-sm table-striped">
                                <thead>
                                    <tr id="init" className="table-success">
                                        <th>ID Producto</th>                                    
                                        <th>Nombre</th>                                    
                                        <th>Descripcion Producto</th>     
                                        <th>Cantidad</th>                       
                                        <th>Vlr. Unit.</th>
                                        <th>Vlr. Total</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { dataOneProduct.map( product => 
                                    <tr> 
                                        <th>{ product.Id_Producto }</th>                                    
                                        <td>{ product.Nombre }</td>
                                        <td>{ product.Descripcion }</td>
                                        <td><input id="input" className="form-control form-control-sm" type="Number" placeholder={ product.Cantidad } 
                                                onChange={ e => updateData(e.target.value, product.Precio, product.Id_Producto) } /></td>
                                        <td>{ product.Precio }</td>
                                        <td>{ product.Total }</td>
                                        <td>
                                            <button className="btnEditSale" type="button" onClick={ () => { deleteDataArray( product.Id_Producto); } }>
                                                <img className="iconEditSale" src={ IconCancel } alt="Cancel" title="Eliminar" />
                                            </button>
                                        </td>
                                    </tr>
                                ) }                                    
                                </tbody>
                            </table>    
                        </div>                                                    
                    </div>
                    <div className="col-md-6">
                        <label for="inputIdClient" className="form-label">Identificacion de Cliente</label>
                        <input type="number" className="form-control" id="inputIdClient" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputNomClient" className="form-label">Nombre de Cliente</label>
                        <input type="text" className="form-control" id="inputNomClient" />
                    </div> 
                    <div className="col-md-6">
                        <label for="inputIdVend" className="form-label">Identificacion de Vendedor</label>
                        <input type="number" className="form-control" id="inputIdVend" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputNomVend" className="form-label">Nombre de Vendedor</label>
                        <input type="text" className="form-control" id="inputNomVend" />
                    </div> 
                    <div className="col-md-6">
                        <label for="inputFecha" className="form-label">Fecha de Venta</label>
                        <input type="date" className="form-control" id="inputFecha" />
                    </div> 
                    <div className="col-md-6">
                        <label for="inputEstado" className="form-label">Estado de la venta</label>
                        <select id="inputEstado" className="form-select">
                            <option defaultValue>Elige el estado actual de la venta...</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Cancelada">Cancelada</option>
                            <option value="Realizada">Realizada</option>
                        </select>
                    </div>
                    <div className="setDivSales col-md-6 mt-5">
                        <button className="btn btn-success setBtnSales" type="reset">Limpiar Campos</button>                        
                    </div>   
                    <div id="div2Sale" className="setDivSales col-md-6 mt-5">
                        <button className="btn btn-secondary setBtnSales" type="button" onClick={ addSale }>Registrar Venta</button>                         
                    </div>   
                </form>
                <div className="container border">
                    <div className="m-3 mt-0">
                        <legend className="m-4">Listado de Ventas ya Registrados</legend>
                        <table className="table table-striped"> 
                            <thead>
                                <tr id="init" className="table-success">
                                    <th>ID Producto</th>                                    
                                    <th>Descripcion Producto</th>     
                                    <th>Cantidad</th>                       
                                    <th>Vlr. Unit.</th>
                                    <th>Vlr. Total</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div> <br /><br />
        </div>
    )
}

export default SalesPage
