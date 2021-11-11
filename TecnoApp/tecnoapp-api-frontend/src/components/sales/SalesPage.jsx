import React, { useState, useEffect } from 'react';
import LogoSales from './img/IconSales.png';
import IconCancel from './img/IconCancel.png';
import IconEdit from '../users/img/iconEdit.png';
import IconDelete from '../users/img/iconDelete.png';
import Swal from 'sweetalert2';
import './css/EstiloSales.css';
import axios from 'axios';

function SalesPage() {

    const [render, setRender] = useState(0);    // Impide loop
    const [falgID, setFlagID] = useState(0);    // Generador Id
    const [Id_Venta, setId_Venta] = useState(0);      
    const [Valor_Total, setValor_Total] = useState(0);   
    const [renderSale, setRenderSale] = useState(0);    // Evita Loop      
    const [dataSales, setDataSales] = useState([]);     // Trae registros de DB  
    const [Productos, setProductos] = useState([]);     // Guarda ventas agregadas
    const [oneSale, setOneSale] = useState([]);         // Guarda una venta que trae de la DB
    const [showAll, setShowAll] = useState(true); 
    const [findOne, setFindOne] = useState(false);          
    const [Id_Cliente, setId_Cliente] = useState(0);     // Estados para mostrar y enviar
    const [Nom_Cliente, setNom_Cliente] = useState('');  
    const [Id_Vendedor, setId_Vendedor] = useState(0);  
    const [Nom_Vendedor, setNom_Vendedor] = useState('');  
    const [Fecha_Venta, setFecha_Venta] = useState('');  
    const [Estado_Venta, setEstado_Venta] = useState('');  
    const [dataProducts, setDataProducts] = useState([]); 
    const [arrayProducts, setArrayProducts] = useState([]);     // Almacena los productos que traen las ventas

    useEffect(() => { 
        axios.get('http://localhost:3001/api/productos')
        .then(res => {
            const products = res.data.productos;                      
            setDataProducts( products );          
            console.log(res.data.message);
        }); 
    }, [render]);

    useEffect(() => { 
        axios.get('http://localhost:3001/api/gestionventas')
        .then(res => {
            const sales = res.data.ventas;                      
            setDataSales( sales );       
            console.log(res.data.message);
        }); 
    }, [renderSale]);
    
    const showOneSale = async () => {
        await axios.get('http://localhost:3001/api/gestionventas/' + Id_Venta)
        .then(res => {
            let venta = [];
            venta.push(res.data.venta);                      
            if (venta[0] == undefined) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'No hay Registros en la Base de Datos Disponibles' });
                setOneSale([]);
            } else {                
                setOneSale( venta );
                console.log(res.data.message);
             }            
        });     
    }
    const addSale = async() => {
        const newSale = { Id_Venta, Productos, Valor_Total, Fecha_Venta, Id_Cliente,
            Nom_Cliente, Id_Vendedor, Nom_Vendedor, Estado_Venta };
        await axios.post('http://localhost:3001/api/gestionventas', newSale)
        .then(res => {
            if(res.data.msg) { Swal.fire({ icon: 'error', title: 'Oops...', text: res.data.message }); }
            else { Swal.fire({ icon: 'success', title: res.data.message, showConfirmButton: false, timer: 3000 }); 
                setProductos([]); setRenderSale(renderSale +1); setValor_Total(0); }            
        });
    }
    const deletSale = async(id) => {
        Swal.fire({
            title: 'Estas Seguro?',
            text: `Eliminaras completamente el registro ${id}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#148f77',
            cancelButtonColor: '#d33',
            cancelButtonText: 'NO, Cancelar!',
            confirmButtonText: 'SI, Eliminarlo!'
          }).then((result) => {
            if (result.isConfirmed) { confirmado(); }
          }); 
          const confirmado = async () => {
            const res = await axios.delete(`http://localhost:3001/api/gestionventas/${ id }`); 
            if(res.data.msg) { Swal.fire({ icon: 'error', title: 'Oops...', text: res.data.message }); } 
            else {
                Swal.fire({ icon: 'success', title: res.data.message, showConfirmButton: false, timer: 3000 });  
                setRenderSale(renderSale +1); setFindOne(false); setShowAll(true);
            }                           
          }   
    }
    const updateSale = async() => {
        const updateProduct = { Id_Venta, Productos, Valor_Total, Id_Vendedor, Nom_Vendedor, Estado_Venta };
        const res = await axios.put('http://localhost:3001/api/productos', updateProduct);
        res.data.msg ? Swal.fire({ icon: 'error', title: 'Oops...', text: res.data.message }) : 
            Swal.fire({ icon: 'success', title: res.data.message, showConfirmButton: false, timer: 3000 });  
        console.log(res.data.message);
        setRenderSale(renderSale +1);
        if(findOne) { showOneSale(); }
    }
    
    function generatorID() {
        let arrayCodigo = new Uint16Array(1);
        window.crypto.getRandomValues(arrayCodigo); 
        const idGener = ('RV' + arrayCodigo[0]);
        setId_Venta( idGener );
        setFlagID(true);
    } 
    function showProducts(id) {
        dataSales.forEach(element => {
            if(element.Id_Venta == id){
                setArrayProducts(element.Productos);
            }
        }); 
    }
    function addSetProductos(id) {
        dataSales.forEach(element => {
            if(element.Id_Venta == id){
                setProductos(element.Productos);
            }
        });
    }
    function dataAdd(id) {
        dataProducts.map( product => {
            if(product.Id_Producto == id) {
                Productos.push({
                    Id_Producto : product.Id_Producto,
                    Nombre : product.Nombre,
                    Descripcion : product.Descripcion,
                    Cantidad : 1,
                    Precio : product.Precio,
                    Total : product.Precio
                });
                setProductos(Productos); 
                updateValorTotal();              
                setRender(render +1);               
            }            
        });          
    } 
    function updateData(cant, precio, id) {  
        Productos.map( product => {            
            if(product.Id_Producto == id) {
                product.Cantidad = cant;
                product.Total = precio * cant;                  
                updateValorTotal();              
            }                        
        });
    }
    function updateValorTotal(){
        let contador = 0;
        Productos.forEach(element => {
            contador += element.Total;
        });        
        setValor_Total(contador);
    }
    function deleteDataArray(id) {
        let indice;
        for (let i = 0; i < Productos.length; i++) {
            if(Productos[i].Id_Producto == id) {
                indice = i; break;
            }            
        }
        Productos.splice(indice, 1);
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
                    <input id="inputColorSale" type="text" className="form-control" placeholder="Codigo de Venta" 
                        aria-describedby="basic-addon1" onChange={ e => setId_Venta( e.target.value ) }/>
                    <a type="button" className="input-group-text btn btn-success" href="#table" 
                        onClick={ () => { setFindOne(true); setShowAll(false); showOneSale(); } }>Buscar</a>
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
                        <label htmlFor="inputID" className="form-label">Identificador Venta</label>
                        <input readOnly type="text" className="form-control" id="inputID" onClick={ generatorID }
                            placeholder={ falgID ? Id_Venta : "Da click aqui para generar el ID de Venta" } />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">Agregar Productos</label>
                        <select id="inputState" className="form-select" onChange={ e => dataAdd(e.target.value) } >
                            <option defaultValue>Elige los Productos de la lista...</option>
                            { dataProducts.map( product => <option value={ product.Id_Producto }>{ product.Nombre }</option> )}
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
                                        <th>Descripcion de Producto</th>     
                                        <th>Cantidad</th>                       
                                        <th>Vlr. Unit.</th>
                                        <th>Vlr. Total</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { Productos.map( product => 
                                    <tr> 
                                        <th>{ product.Id_Producto }</th>                                    
                                        <td>{ product.Nombre }</td>
                                        <td>{ product.Descripcion }</td>
                                        <td><input id="input" className="form-control form-control-sm" type="Number" placeholder={ product.Cantidad } 
                                                onChange={ e => updateData(e.target.value, product.Precio, product.Id_Producto) } /></td>
                                        <td>{ product.Precio }</td>
                                        <td>{ product.Total }</td>
                                        <td>
                                            <button className="btnEditSale" type="button" 
                                                onClick={ () => { deleteDataArray( product.Id_Producto ); } }>
                                                <img className="iconEditSale" src={ IconCancel } alt="Cancel" title="Eliminar" />
                                            </button>
                                        </td>
                                    </tr>
                                ) }                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan="2">Total Valor Venta :</th>
                                        <th>{ Valor_Total }</th>
                                    </tr>
                                </tfoot>
                            </table>    
                        </div>                                                    
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputIdClient" className="form-label">Identificacion de Cliente</label>
                        <input type="number" className="form-control" id="inputIdClient" 
                            onChange={ e => setId_Cliente(e.target.value) } />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputNomClient" className="form-label">Nombre de Cliente</label>
                        <input type="text" className="form-control" id="inputNomClient" 
                            onChange={ e => setNom_Cliente(e.target.value) } />
                    </div> 
                    <div className="col-md-6">
                        <label htmlFor="inputIdVend" className="form-label">Identificacion de Vendedor</label>
                        <input type="number" className="form-control" id="inputIdVend" 
                            onChange={ e => setId_Vendedor(e.target.value) } />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputNomVend" className="form-label">Nombre de Vendedor</label>
                        <input type="text" className="form-control" id="inputNomVend" 
                            onChange={ e => setNom_Vendedor(e.target.value) } />
                    </div> 
                    <div className="col-md-6">
                        <label htmlFor="inputFecha" className="form-label">Fecha de Venta</label>
                        <input type="date" className="form-control" id="inputFecha" 
                            onChange={ e => setFecha_Venta(e.target.value) } />
                    </div> 
                    <div className="col-md-6">
                        <label htmlFor="inputEstado" className="form-label">Estado de la venta</label>
                        <select id="inputEstado" className="form-select" onChange={ e => setEstado_Venta(e.target.value) }>
                            <option defaultValue>Elige el estado actual de la venta...</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Cancelada">Cancelada</option>
                            <option value="Realizada">Realizada</option>
                        </select>
                    </div>
                    <div className="setDivSales col-md-6 mt-5">
                        <button className="btn btn-success setBtnSales" type="reset" >Limpiar Campos</button>                        
                    </div>   
                    <div id="div2Sale" className="setDivSales col-md-6 mt-5">
                        <button className="btn btn-secondary setBtnSales" type="button" onClick={ () => { addSale(); setFlagID(false); }  }>Registrar Venta</button>                         
                    </div>   
                </form>
                <div className="container border">
                    <div className="m-3 mt-0">
                        <legend className="m-4">Listado de Registro de Ventas</legend>
                        <table id="table" className="table table-striped"> 
                            <thead>
                                <tr id="init" className="table-success">
                                    <th>ID Venta</th>                                    
                                    <th>Descripcion</th>  
                                    <th>Fecha</th>  
                                    <th>Total</th>  
                                    <th>Id Cliente</th>
                                    <th>Nom Cliente</th>
                                    <th>Id Vend.</th>
                                    <th>Nom Vend.</th>
                                    <th>Estado</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                { showAll ? dataSales.map ( sale => 
                                <tr>
                                    <th>{ sale.Id_Venta }</th>
                                    <td>
                                        <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" 
                                            data-bs-target="#showProducts" onClick={ () => { showProducts(sale.Id_Venta) } }>
                                            Listar Productos
                                        </button>                                        
                                    </td>
                                    <td>{ sale.Fecha_Venta }</td>
                                    <td>{ sale.Valor_Total }</td>
                                    <td>{ sale.Id_Cliente }</td>
                                    <td>{ sale.Nom_Cliente }</td>
                                    <td>{ sale.Id_Vendedor }</td>
                                    <td>{ sale.Nom_Vendedor }</td>
                                    <td>{ sale.Estado_Venta }</td>
                                    <td>
                                        <button className="btnEditSales" data-bs-toggle="modal" data-bs-target="#modalEdit" onClick={ () => { 
                                            addSetProductos(sale.Id_Venta); setId_Venta(sale.Id_Venta); setFecha_Venta(sale.Fecha_Venta);
                                            setValor_Total(sale.Valor_Total); setId_Cliente(sale.Id_Cliente); setNom_Cliente(sale.Nom_Cliente);
                                            setId_Vendedor(sale.Id_Vendedor); setNom_Vendedor(sale.Nom_Vendedor); setEstado_Venta(sale.Estado_Venta); } } >                                        
                                            <img id="btnEditSales" className="iconsEditSales" src={ IconEdit } alt="Editar" title="Edit"/>                                            
                                        </button>
                                        <button className="btnEditSales" onClick={ () => { deletSale( sale.Id_Venta ); } }>
                                            <img className="iconsEditSales" src={ IconDelete } alt="Eliminar" title="Delete" />
                                        </button>
                                    </td>
                                </tr>
                                ) : null } 
                                { findOne && oneSale.length > 0 ? 
                                    oneSale.map( sale => 
                                        <tr>
                                            <th>{ sale.Id_Venta }</th>
                                            <td>
                                                <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" 
                                                    data-bs-target="#showProducts" onClick={ () => { showProducts(sale.Id_Venta) } }>
                                                    Listar Productos
                                                </button>                                        
                                            </td>
                                            <td>{ sale.Fecha_Venta }</td>
                                            <td>{ sale.Valor_Total }</td>
                                            <td>{ sale.Id_Cliente }</td>
                                            <td>{ sale.Nom_Cliente }</td>
                                            <td>{ sale.Id_Vendedor }</td>
                                            <td>{ sale.Nom_Vendedor }</td>
                                            <td>{ sale.Estado_Venta }</td>
                                            <td>
                                                <button className="btnEditSales" data-bs-toggle="modal" data-bs-target="#modalEdit" 
                                                    onClick={ () => { addSetProductos(sale.Id_Venta); setId_Venta(sale.Id_Venta); setFecha_Venta(sale.Fecha_Venta);
                                                        setValor_Total(sale.Valor_Total); setId_Cliente(sale.Id_Cliente); setNom_Cliente(sale.Nom_Cliente);
                                                        setId_Vendedor(sale.Id_Vendedor); setNom_Vendedor(sale.Nom_Vendedor); setEstado_Venta(sale.Estado_Venta); } } >                                        
                                                    <img id="btnEditSales" className="iconsEditSales" src={ IconEdit } alt="Editar" title="Edit"/>                                            
                                                </button>
                                                <button className="btnEditSales" onClick={ () => { deletSale( sale.Id_Venta ); } }>
                                                    <img className="iconsEditSales" src={ IconDelete } alt="Eliminar" title="Delete" />
                                                </button>
                                            </td>
                                        </tr>
                                ) : null }
                                <div className="modal fade" id="showProducts" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div id="headColor" className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Productos que se agregaron a la venta</h5>
                                            </div>
                                            <div className="modal-body">
                                                <table className="table table-success table-sm table-striped">
                                                    <thead>
                                                        <tr id="init" className="table-success">
                                                            <th>ID Producto</th>                                    
                                                            <th>Nombre</th>                                    
                                                            <th>Descripcion Producto</th>     
                                                            <th>Cantidad</th>                       
                                                            <th>Precio</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {  arrayProducts.map ( product => 
                                                        <tr> 
                                                            <th>{ product.Id_Producto }</th>
                                                            <td>{ product.Nombre }</td>
                                                            <td>{ product.Descripcion }</td>
                                                            <td>{ product.Cantidad }</td>
                                                            <td>{ product.Precio }</td>
                                                            <td>{ product.Total }</td>
                                                        </tr> 
                                                    ) }                                                                                                  
                                                    </tbody>
                                                </table>    
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-success" data-bs-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div id="tamModal" className="modal-dialog modal-xl">
                                        <div className="modal-content">
                                            <div id="headColor" className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Editar Venta Realizada</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body"> 
                                                <form className="row g-3 m-4 mt-2">
                                                    <div className="col-md-6">
                                                        <label className="m-1">Identificador Venta</label>
                                                        <input type="text" className="form-control" disabled value={ Id_Venta }/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="m-1">Agregar Productos</label>
                                                        <select className="form-select" onChange={ e => dataAdd(e.target.value) } >
                                                            <option defaultValue>Elige los Productos de la lista...</option>
                                                            { dataProducts.map( product => <option value={ product.Id_Producto }>{ product.Nombre }</option> )}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="container border">
                                                            <legend className="m-3">Productos Agregados</legend>
                                                            <table className="table table-success table-sm table-striped">
                                                                <thead>
                                                                    <tr id="init" className="table-success">
                                                                        <th>ID</th>                                    
                                                                        <th>Nombre</th>                                    
                                                                        <th>Descripcion de Producto</th>     
                                                                        <th>Cantidad</th>                       
                                                                        <th>Precio</th>
                                                                        <th>Total</th>
                                                                        <th>Accion</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                { Productos.map( product => 
                                                                    <tr> 
                                                                        <th>{ product.Id_Producto }</th>                                    
                                                                        <td>{ product.Nombre }</td>
                                                                        <td>{ product.Descripcion }</td>
                                                                        <td><input id="input" className="form-control form-control-sm" type="Number" 
                                                                                placeholder={ product.Cantidad } onChange={ e => 
                                                                                updateData(e.target.value, product.Precio, product.Id_Producto) } /></td>
                                                                        <td>{ product.Precio }</td>
                                                                        <td>{ product.Total }</td>
                                                                        <td>
                                                                            <button className="btnEditSale" type="button" 
                                                                                onClick={ () => { deleteDataArray( product.Id_Producto ); } }>
                                                                                <img className="iconEditSale" src={ IconCancel } alt="Cancel" title="Eliminar" />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ) }                                    
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <th colSpan="2">Total Valor Venta :</th>
                                                                        <th>{ Valor_Total }</th>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>    
                                                        </div>                                                    
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="m-1">Identificacion de Cliente</label>
                                                        <input type="number" className="form-control " disabled value={ Id_Cliente } />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="m-1">Nombre de Cliente</label>
                                                        <input type="text" className="form-control " disabled value={ Nom_Cliente } />
                                                    </div> 
                                                    <div className="col-md-6">
                                                        <label htmlFor="inputIdVend" className="m-1">Identificacion de Vendedor</label>
                                                        <input type="number" className="form-control " id="inputIdVend" value={ Id_Vendedor }
                                                            onChange={ e => setId_Vendedor(e.target.value) } />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="inputNomVend" className="m-1">Nombre de Vendedor</label>
                                                        <input type="text" className="form-control " id="inputNomVend" value={ Nom_Vendedor }
                                                            onChange={ e => setNom_Vendedor(e.target.value) } />
                                                    </div> 
                                                    <div className="col-md-6">
                                                        <label className="m-1">Fecha de Venta</label>
                                                        <input type="text" className="form-control " disabled value={ Fecha_Venta } />
                                                    </div> 
                                                    <div className="col-md-6">
                                                        <label htmlFor="inputEstado" className="m-1">Estado de la venta</label>
                                                        <select id="inputEstado" className="form-select" 
                                                            onChange={ e => setEstado_Venta(e.target.value) }>
                                                            <option defaultValue>{ Estado_Venta }</option>
                                                            <option value="En Proceso">En Proceso</option>
                                                            <option value="Cancelada">Cancelada</option>
                                                            <option value="Realizada">Realizada</option>
                                                        </select>
                                                    </div>            
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal" 
                                                    onClick={ updateSale }>Actualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>                         
                            </tbody>
                        </table>
                        { findOne ? 
                        <div className="d-grid gap-2 col-6 mx-auto mt-5">
                            <button className="btn btn-success" type="reset" onClick={ () => { setFindOne( false ); setShowAll( true ); } }>
                                Listar todos las Ventas
                            </button> <br />
                        </div> : null } 
                    </div>
                </div> <br />
            </div> <br /><br />
        </div>
    )
}

export default SalesPage
