import React from 'react';
import './css/EstiloLgin.css';
import Logo from './img/TecnoApp.png';
import LogoGoogle from './img/IconGoogle.png';
import LogoFace from './img/IconFace.png';
import logoInsta from './img/IconInsta.png';

function Login() {
    return (
        <div id="bodyMain">            
            <div className="login-box">
                <img src={ Logo } className="logo-Login" alt="TecnoApp" />
                <h1 className="titleLog">Inicio de Sesion</h1>
                <form action="">
                    <label className="labelLogin">Usuario</label>
                    <input type="text" className="inputLogin" placeholder="Ingresa tu Usuario" />
                    <label className="labelLogin">Contraseña</label>
                    <input type="password" className="inputLogin" placeholder="Ingresa tu Contraseña" />
                    <input id="btnLogin" type="submit" value="Iniciar Sesion" />
                    <a className="linkLogin" href="#">Olvidaste tu contraseña ?</a> <br />
                    <a className="linkLogin" href="#">No tienes una cuenta ?</a> 
                    <p className="parraf">_________ O Continuar con ... _________</p>
                    <div className="iconsBox">
                        <a href="#"><img className="iconsSocial len"  src={ LogoGoogle } alt="Google"/></a>
                        <a href="#"><img className="iconsSocial len" src={ LogoFace } alt="Facebook"/></a>
                        <a href="#"><img className="iconsSocial" src={ logoInsta } alt="Instagram"/></a>
                    </div>
                    
                </form>
            </div>                     
        </div>
    )
}

export default Login
