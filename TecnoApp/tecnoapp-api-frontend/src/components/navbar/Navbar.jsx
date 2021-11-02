import React from 'react';
import './css/EstiloNavbar.css';
import { Link } from "react-router-dom";
import Logo from '../login/img/TecnoApp.png';
import { useAuth0 } from "@auth0/auth0-react";


function Navbar() {
    const { logout } = useAuth0();
    const { user } = useAuth0();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand" href="#">
                        <img src={ Logo } alt="TecnoApp" width="40" height="34" className="d-inline-block align-text-top" />
                        <span className="textNavbar">TecnoApp</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" />
                    <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">                        
                            <li className="nav-item"><Link to='/productos' className="nav-link" href="#">Gestion de Productos</Link></li>
                            <li className="nav-item"><Link to='/usuarios' className="nav-link" href="#">Gestion de Usuarios</Link></li>
                            <li className="nav-item"><Link to='/ventas' className="nav-link" href="#">Gestion de Ventas</Link></li>  
                            <li className="nav-item">
                                <button type="button" className="btn btn-light rounded-circle btnUser" 
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <img className="rounded-circle imgUser1" src={ user.picture } alt={ user.name } />
                                </button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" 
                                    aria-hidden="true">
                                    <div className="modal-dialog modal-sm">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <img className="rounded-circle imgUser2" src={ user.picture } alt={ user.name } />
                                            </div>
                                            <div className="modal-body">
                                                <label className="labelUserLog name">{ user.name }</label> <br />
                                                <label id="labelEmail" className="labelUserLog">{ user.email }</label>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger btnCloseUser" onClick={() => logout({ returnTo: window.location.origin })}>
                                                    Cerrar Sesion
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>  
                            <li><label className="labelUser">{ user.name }</label></li>                                 
                        </ul>                      
                    </div>
                </div>                                             
            </nav>
        </div>
    )
}

export default Navbar
