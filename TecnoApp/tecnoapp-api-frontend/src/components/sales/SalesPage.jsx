import React from 'react';
import LogoSales from './img/IconSales.png';
import IconCancel from './img/IconCancel.png';
import './css/EstiloSales.css';

function SalesPage() {
    const addSale = async => {

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
            <div className="container border">
                <form className="row g-3 m-4 mt-2">
                    <legend>Registro de Ventas</legend>
                    <div class="col-md-6">
                        <label for="inputID" class="form-label">Identificador Venta</label>
                        <input readOnly type="text" class="form-control" id="inputID" placeholder="Da click aqui para generar el ID de Venta" />
                    </div>
                    <div class="col-md-6">
                        <label for="inputState" class="form-label">Agregar Productos</label>
                        <select id="inputState" class="form-select">
                            <option defaultValue>Elige los Productos de la lista...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <div className="container border">
                            <legend className="m-3">Productos Agregados</legend>
                            <table className="table table-success table-sm table-striped">
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
                                <tbody>
                                    <tr>
                                        <th>VR12345</th>                                    
                                        <td>Monitor de 21" marca Lenovo</td>
                                        <td>2</td>
                                        <td>750000</td>
                                        <td>1500000</td>
                                        <td>
                                            <button className="btnEditSale">
                                                <img className="iconEditSale" src={ IconCancel } alt="Cancel" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>    
                        </div>                                                    
                    </div>
                    <div class="col-md-6">
                        <label for="inputIdClient" class="form-label">Identificacion de Cliente</label>
                        <input type="number" class="form-control" id="inputIdClient" />
                    </div>
                    <div class="col-md-6">
                        <label for="inputNomClient" class="form-label">Nombre de Cliente</label>
                        <input type="text" class="form-control" id="inputNomClient" />
                    </div> 
                    <div class="col-md-6">
                        <label for="inputIdVend" class="form-label">Identificacion de Vendedor</label>
                        <input type="number" class="form-control" id="inputIdVend" />
                    </div>
                    <div class="col-md-6">
                        <label for="inputNomVend" class="form-label">Nombre de Vendedor</label>
                        <input type="text" class="form-control" id="inputNomVend" />
                    </div> 
                    <div class="col-md-6">
                        <label for="inputFecha" class="form-label">Fecha de Venta</label>
                        <input type="date" class="form-control" id="inputFecha" />
                    </div> 
                    <div class="col-md-6">
                        <label for="inputEstado" class="form-label">Estado de la venta</label>
                        <select id="inputEstado" class="form-select">
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
            </div> <br /><br />
        </div>
    )
}

export default SalesPage
