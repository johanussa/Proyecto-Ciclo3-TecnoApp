import React from 'react';
import IconUser from './img/iconUser.png';
import IconEdit from './img/iconEdit.png';
import IconDelete from './img/iconDelete.png';
import './css/EstiloUserPage.css';

function UsersPage() {
    return (
        <div>
            <div className="container">
                <img id="iconUser" src={ IconUser } alt="User" />
                <h1 id="titleGesUser">Gestion de Usuarios</h1> <br />
            </div>
            <div className="divTitleUser">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <span id="text" className="nav-link active" >Administracion</span>
                    </li>
                </ul>
            </div> <br /><br />
            <div className="container border"> <br />
                <table class="table table-striped">
                    <thead>
                        <tr className="table-primary">
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>E-mail</th>                            
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">10136</th>
                            <td>Johan Sebastian Ussa Rubio</td>
                            <td>johanuss0405@gmail.com</td>
                            <td>Administrador</td>
                            <td>
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </td>
                            <td>
                                <button className="btnEditUser" data-bs-toggle="modal" data-bs-target="#modalEdit">
                                    <img id="btnEditUser" className="iconsEditUser" src={ IconEdit } alt="Editar" title="Edit"/>
                                    <img className="iconsEditUser" src={ IconDelete } alt="Eliminar" title="Delete" />
                                </button>
                                <div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div id="modalUserolor" class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Editar Usuario</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ...
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                            <button type="button" class="btn btn-primary">Actualizar</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default UsersPage
