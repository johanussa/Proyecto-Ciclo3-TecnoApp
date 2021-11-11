import React, { useEffect, useState } from 'react';
import LogoProduct from './img/IconProduct.png';
import IconEdit from '../users/img/iconEdit.png';
import IconDelete from '../users/img/iconDelete.png';
import './css/EstiloProducts.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function ProductsPage() {

    const [state, setState] = useState([]);
    const [flagID, setFlagID] = useState(false);
    const [OneProduct, setOneProduct] = useState([]);
    const [render, setRender] = useState(0);
    const [Id_Producto, setId_Producto] = useState(0);
    const [Nombre, setNombre] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Precio, setPrecio] = useState(0);
    const [Estado, setEstado] = useState('');
    const [findMany, setFindMany] = useState(true);
    const [findOne, setFindOne] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/api/productos')
        .then(res => {
            const products = res.data.productos;
            setState( products );          
            console.log(res.data.message);
        });        
    }, [render] );

    function generatorID() {
        let arrayCodigo = new Uint16Array(1);
        window.crypto.getRandomValues(arrayCodigo); 
        const idGener = ('PR' + arrayCodigo[0]);
        setId_Producto( idGener );
        setFlagID(true);
    } 
    const showOneProduct = async () => {
        await axios.get('http://localhost:3001/api/productos/' + Id_Producto)
        .then(res => {
            let product = [];
            product.push(res.data.productoBD);                      
            if (product[0] == undefined) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'No hay Registros en la Base de Datos Disponibles' });
                setOneProduct([]);
            } else {                
                setOneProduct( product );
                console.log(res.data.message);
             }            
        });     
    }
    const addProduct = async () => {
        const productNew = { Id_Producto, Nombre, Descripcion, Precio, Estado };
        await axios.post('http://localhost:3001/api/productos', productNew)
        .then(res => {
            if(res.data.msg) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: res.data.message });
            } else {
                Swal.fire({ icon: 'success', title: res.data.message, showConfirmButton: false, timer: 3000 });
                setFindMany(true); setFindOne(false); setRender(render +1);
            }            
        });        
    }
    const deletProduct = async (id) => {
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
            const res = await axios.delete(`http://localhost:3001/api/productos/${ id }`);      
            res.data.msg ? Swal.fire({ icon: 'error', title: 'Oops...', text: res.data.message }) : 
              Swal.fire({ icon: 'success', title: res.data.message, showConfirmButton: false, timer: 3000 });  
            setRender(render +1); setFindOne(false); setFindMany(true);
          }     
    }
    const updateProduct = async () => {
        const updateProduct = { Id_Producto, Nombre, Descripcion, Precio, Estado };
        const res = await axios.put('http://localhost:3001/api/productos', updateProduct);
        res.data.msg ? Swal.fire({ icon: 'error', title: 'Oops...', text: res.data.message }) : 
            Swal.fire({ icon: 'success', title: res.data.message, showConfirmButton: false, timer: 3000 });  
        console.log(res.data.message);
        setRender(render +1);
        if(findOne) { showOneProduct(); }
    }
    return (
        <div className="backColorProduct">
            <div className="container">
                <img id="iconProduct" src={ LogoProduct } alt="Product" />
                <h1 id="titleGesProduct">Gestion de Productos</h1> <br />
            </div>
            <div id="divSearchProduct" className="container border input-group">
                <h5 id="titleSearchProduct">Buscar Producto</h5>  
                <div className="input-group">                    
                    <input id="inputColor" type="text" className="form-control" placeholder="Codigo de Producto"                     
                        aria-describedby="basic-addon1" onChange={ e => setId_Producto( e.target.value ) } />
                    <a type="button" className="input-group-text btn btn-danger" href="#init"
                        onClick={ () => { setFindOne(true); setFindMany(false); showOneProduct(); } }>Buscar</a>
                </div>             
            </div>
            <div className="divTitleProduct">
                <ul id="navtabs" className="nav nav-tabs">
                    <li className="nav-item">
                        <span id="textProduct" className="nav-link active" >Administracion de Productos</span>
                    </li>
                </ul>
            </div> <br /><br />
            <div className="container border">
                <form className="row g-3 m-4 mt-2">
                    <legend>Registro de Productos</legend>
                    <div className="col-md-6">
                        <label for="inputId" className="form-label">ID Producto</label>
                        <input type="number" className="form-control" id="inputId" readOnly onChange={ e => setId_Producto( e.target.value ) }
                            onClick={ generatorID } placeholder={ flagID ? Id_Producto : "Dale click aqui para asignar un codigo unico de producto" } />
                    </div>
                    <div className="col-md-6">
                        <label for="inputNombre" className="form-label">Nombre Producto</label>
                        <input type="text" className="form-control" id="inputNombre" onChange={ e => setNombre( e.target.value) } />
                    </div>
                    <div className="col-12">
                        <label for="inputDescrip" className="form-label">Descripcion de Producto</label>
                        <input type="text" className="form-control text-break" id="inputDescrip" 
                            onChange={ e => setDescripcion( e.target.value) } />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPrecio" className="form-label">Precio Producto</label>
                        <input type="number" className="form-control" id="inputPrecio" onChange={ e => setPrecio( e.target.value) } />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Estado del Producto</label>
                        <select className="form-select"  onChange={ e => setEstado( e.target.value) }>
                            <option defaultValue>Seleccione el estado</option>
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
                        </select>
                    </div>
                    <div className="setDivProducts col-md-6 mt-5">
                        <button className="btn btn-danger setBtnProducts" type="reset">Limpiar Campos</button>                        
                    </div>   
                    <div id="div2Product" className="setDivProducts col-md-6 mt-5">
                        <button className="btn btn-secondary setBtnProducts" type="button" onClick={ addProduct }>Registrar Producto</button>                         
                    </div>                                    
                </form>
                <div className="container border">
                    <div className="m-3 mt-0">
                        <legend className="m-4">Listado de Productos ya Registrados</legend>
                        <table className="table table-striped">
                            <thead>
                                <tr id="init" className="table-danger">
                                    <th>ID Producto</th>
                                    <th>Nombre</th>
                                    <th>Descripcion Producto</th>                            
                                    <th>Precio</th>
                                    <th>Estado</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                            { findMany ?
                                state.map( product =>
                                <tr>
                                    <th scope="row">{ product.Id_Producto }</th>
                                    <td>{ product.Nombre }</td>
                                    <td>{ product.Descripcion }</td>
                                    <td>{ product.Precio }</td>
                                    <td>{ product.Estado }</td>
                                    <td>
                                        <button className="btnEditProduct" data-bs-toggle="modal" data-bs-target="#modalEdit" 
                                            onClick={ () => { setId_Producto( product.Id_Producto ); setNombre( product.Nombre ); 
                                                setDescripcion( product.Descripcion ); setPrecio( product.Precio ); setEstado( product.Estado ); } }>                                        
                                            <img id="btnEditProduct" className="iconsEditProducts" src={ IconEdit } alt="Editar" title="Edit"/>                                            
                                        </button>
                                        <button className="btnEditProduct" onClick={ () => { deletProduct( product.Id_Producto ); } }>
                                            <img className="iconsEditProducts" src={ IconDelete } alt="Eliminar" title="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            ) : null } 
                            { findOne && OneProduct.length > 0 ? 
                                OneProduct.map( product =>                                             
                                <tr>                        
                                    <th scope="row">{ product.Id_Producto }</th>
                                    <td>{ product.Nombre }</td>
                                    <td>{ product.Descripcion }</td>
                                    <td>{ product.Precio }</td>
                                    <td>{ product.Estado }</td>
                                    <td>
                                        <button className="btnEditProduct" data-bs-toggle="modal" data-bs-target="#modalEdit" onClick={ () => { 
                                                setId_Producto( product.Id_Producto ); setNombre( product.Nombre ); setDescripcion( product.Descripcion ); 
                                                setPrecio( product.Precio ); setEstado( product.Estado ); } } >
                                            <img id="btnEditProduct" className="iconsEditProducts" src={ IconEdit } alt="Editar" title="Edit"/>                                            
                                        </button>
                                        <button className="btnEditProduct" onClick={ () => { deletProduct( product.Id_Producto ); } }>
                                            <img className="iconsEditProducts" src={ IconDelete } alt="Eliminar" title="Delete" />
                                        </button>
                                    </td> <br /><br />                                                                                                             
                                </tr>
                            )  :  null } 
                                <div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div id="modalProductColor" className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Editar Poducto</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="row g-3">
                                                    <div className="col-md-5">
                                                        <label htmlFor="inputCodigo" className="form-control-sm">ID Producto</label>
                                                        <input type="text" className="form-control form-control-sm" id="inputCodigo" 
                                                            disabled value={ Id_Producto }></input>                                                
                                                    </div>
                                                    <div className="col-md-7">
                                                        <label htmlFor="inputNom" className="form-control-sm">Nombre</label>
                                                        <input type="text" className="form-control form-control-sm" id="inputNom" value={ Nombre }
                                                            onChange={ e => setNombre( e.target.value ) }></input>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label htmlFor="inputDes" className="form-control-sm">Descripcion</label>
                                                        <input type="email" className="form-control form-control-sm" id="inputDes" 
                                                            value={ Descripcion } onChange={ e => setDescripcion( e.target.value ) }></input>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-control-sm">Precio</label>
                                                        <input type="number" className="form-control form-control-sm" value={ Precio }
                                                            onChange={ e => setPrecio( e.target.value ) }></input>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-control-sm">Estado</label>
                                                        <select className="form-select form-select-sm" onChange={ e => setEstado( e.target.value ) } >              
                                                            <option defaultValue>{ Estado }</option>
                                                            <option value="Disponible">Disponible</option>
                                                            <option value="No Disponible">No Disponible</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" 
                                                    onClick={ updateProduct }>Actualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </tbody>
                        </table>
                        { findOne ? 
                            <div className="d-grid gap-2 col-6 mx-auto mt-5">
                                <button className="btn btn-danger" type="reset" onClick={ () => { setFindOne( false ); setFindMany( true ); 
                                        setRender( render +1 ); } }>
                                    Listar todos los Productos
                                </button> <br />
                            </div> : null }  
                    </div>                    
                </div> <br />                
            </div> <br />            
        </div>
    )
}

export default ProductsPage
