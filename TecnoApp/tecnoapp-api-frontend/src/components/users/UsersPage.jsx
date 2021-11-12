import React, { useState, useEffect } from 'react';
import IconDelete from './img/iconDelete.png';
import IconUser from './img/iconUser.png';
import IconEdit from './img/iconEdit.png';
import './css/EstiloUserPage.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function UsersPage() {

    const [render, setRender] = useState(0);
    const [state, setState] = useState([]);                  
    const [Rol, setRol] = useState('');     
    const [Email, setEmail] = useState('');  
    const [Nombre, setNombre] = useState('');  
    const [Estado, setEstado] = useState('');        
    const [Codigo, setCodigo] = useState(0);  
    const [findOne, setFindOne] = useState(false);
    const [findMany, setFindMany] = useState(true); 
    const [stateOneUser, setStateOneUser] = useState([]);     

    useEffect(() => {
        axios.get('http://localhost:3001/api/usuarios')
        .then(res => {
            const users = res.data.users;
            setState( users );          
            console.log(res.data.message);
        });        
    }, [render] );
    
    const showOnlyUser = async () => {
        await axios.get('http://localhost:3001/api/usuarios/' + Codigo)
        .then(res => {
            let user = [];
            user.push(res.data.userBD);                      
            if (user[0] == undefined) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'No hay Registros en la Base de Datos Disponibles' });
                setStateOneUser([]);
            } else {                
                setStateOneUser(user);
                console.log(res.data.message);
             }            
        });     
    }
    const updateUser = async () => {
        const updateUser = { Codigo, Rol, Estado };
        const res = await axios.put('http://localhost:3001/api/usuarios', updateUser);
        res.data.msg ? Swal.fire({ icon: 'error', title: 'Oops...', text: res.data.message }) : 
            Swal.fire({ icon: 'success', title: res.data.message, showConfirmButton: false, timer: 3000 });  
        console.log(res.data.message);
        setRender(render +1);
        if(findOne) { showOnlyUser(); }
    }
    const deletUser = async (id) => {        
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
            const res = await axios.delete(`http://localhost:3001/api/usuarios/${ id }`);      
            res.data.msg ? Swal.fire({ icon: 'error', title: 'Oops...', text: res.data.message }) : 
              Swal.fire({ icon: 'success', title: res.data.message, showConfirmButton: false, timer: 3000 });  
            setRender(render +1); setFindOne(false); setFindMany(true);
          }     
    }    
    return (
        <div className="backColorUser">
            <div className="container">
                <img id="iconUser" src={ IconUser } alt="User" />
                <h1 id="titleGesUser">Gestion de Usuarios</h1> <br />
            </div>
            <div id="divSearch" className="container border input-group">
                <h5 id="titleSearchUser">Buscar Usuario</h5>  
                <div id="divInputSearchUser" className="input-group">                    
                    <input type="text" className="form-control" placeholder="Codigo de Usuario" aria-label="Username" 
                        aria-describedby="basic-addon1" onChange={ e => setCodigo( e.target.value ) }/>
                    <button type="button" className="input-group-text btn btn-primary" 
                        onClick={ () => { setFindOne(true); setFindMany(false); showOnlyUser(); } }>Buscar</button>
                </div>             
            </div>
            <div className="divTitleUser">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <span id="text" className="nav-link active" >Administracion de Cuentas</span>
                    </li>
                </ul>
            </div> <br /><br />
            <div className="container border"> 
                <div className="m-3 mt-0">
                    <legend className="m-4">Listado de Usuarios</legend>
                    <table className="table table-striped">
                        <thead>
                            <tr className="table-primary">
                                <th>Codigo</th>
                                <th>Nombre Usuario</th>
                                <th>E-mail Usuario</th>                            
                                <th>Rol Usuario</th>
                                <th>Estado</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                        { findOne && stateOneUser.length > 0 ? 
                            stateOneUser.map( user =>                                             
                            <tr>                        
                                <th scope="row">{ user.Codigo }</th>
                                <td>{ user.Nombre }</td>
                                <td>{ user.Email }</td>
                                <td>{ user.Rol }</td>
                                <td>{ user.Estado }</td>
                                <td>
                                    <button className="btnEditUser" data-bs-toggle="modal" data-bs-target="#modalEdit"  onClick={ () => { 
                                            setCodigo( user.Codigo ); setNombre( user.Nombre ); setEmail( user.Email ); 
                                            setRol( user.Rol ); setEstado( user.Estado ); } } >
                                        <img id="btnEditUser" className="iconsEditUser" src={ IconEdit } alt="Editar" title="Edit"/>                                            
                                    </button>
                                    <button className="btnEditUser" onClick={ () => { deletUser( user.Codigo ); } }>
                                        <img className="iconsEditUser" src={ IconDelete } alt="Eliminar" title="Delete" />
                                    </button>
                                </td> <br /><br />                                                                                                             
                            </tr>
                            )  :  null }     
                        { findMany ?
                            state.map( users =>
                            <tr>
                                <th scope="row">{ users.Codigo }</th>
                                <td>{ users.Nombre }</td>
                                <td>{ users.Email }</td>
                                <td>{ users.Rol }</td>
                                <td>{ users.Estado }</td>
                                <td>
                                    <button className="btnEditUser" data-bs-toggle="modal" data-bs-target="#modalEdit" 
                                        onClick={ () => { setCodigo( users.Codigo ); setNombre( users.Nombre ); 
                                            setEmail( users.Email ); setRol( users.Rol ); setEstado( users.Estado ); } }>                                        
                                        <img id="btnEditUser" className="iconsEditUser" src={ IconEdit } alt="Editar" title="Edit"/>                                            
                                    </button>
                                    <button className="btnEditUser" onClick={ () => { deletUser( users.Codigo ); } }>
                                        <img className="iconsEditUser" src={ IconDelete } alt="Eliminar" title="Delete" />
                                    </button>
                                </td>
                            </tr>
                            ) : null }              
                            <div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div id="modalUserolor" className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Editar Usuario</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form className="row g-3">
                                                <div className="col-md-5">
                                                    <label htmlFor="inputCodigo" className="form-control-sm">Codigo</label>
                                                    <input type="text" className="form-control form-control-sm" id="inputCodigo" 
                                                        disabled value={ Codigo }></input>                                                
                                                </div>
                                                <div className="col-md-7">
                                                    <label htmlFor="inputPass" className="form-control-sm">Nombre</label>
                                                    <input type="text" className="form-control form-control-sm" id="inputPass" 
                                                        disabled value={ Nombre }></input>
                                                </div>
                                                <div className="col-md-7">
                                                    <label htmlFor="inputEmail" className="form-control-sm">Email</label>
                                                    <input type="email" className="form-control form-control-sm" id="inputEmail" 
                                                        disabled value={ Email }></input>
                                                </div>
                                                <div className="col-md-5">
                                                    <label className="form-control-sm">Rol</label>
                                                    <select className="form-select form-select-sm" onChange={ e => setRol( e.target.value) } >              
                                                        <option defaultValue>{ Rol }</option>
                                                        <option value="Administrador">Administrador</option>
                                                        <option value="Vendedor">Vendedor</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="form-control-sm">Estado</label>
                                                    <select className="form-select form-select-sm" onChange={ e => setEstado( e.target.value ) } >              
                                                        <option defaultValue>{ Estado }</option>
                                                        <option value="Autorizado">Autorizado</option>
                                                        <option value="No Autorizado">No Autorizado</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" 
                                                onClick={ updateUser }>Actualizar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                                                                                        
                        </tbody>
                    </table>  
                    { findOne ? 
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-primary" type="reset" onClick={ () => { setFindOne( false ); setFindMany( true ); 
                                setRender( render +1 ); } }> 
                            Listar todos los Usuarios
                        </button> 
                    </div> : null }   
                </div>                                              
            </div> <br /><br />              
        </div>
    )
}

export default UsersPage
