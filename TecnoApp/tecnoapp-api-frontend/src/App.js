import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./components/login/LoginPage";
import SalesPage from "./components/sales/SalesPage";
import UsersPage from "./components/users/UsersPage";
import WelcomePage from "./components/welcome/WelcomePage";
import ProductsPage from "./components/products/ProductsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [adminAut, setAdminAut] = useState(false);
  const [sellerAut, setSellerAut] = useState(false);

  useEffect(() => {
    if(isAuthenticated) {
      axios.get('https://tecnoapp-misiontic.herokuapp.com/api/usuarios')
      .then(res => {        
          const users = res.data.users;
          users.map( usuario => {
            if(usuario.Email === user.email) {
              console.log(usuario);
              if(usuario.Rol === "Administrador" && usuario.Estado === "Autorizado") { setAdminAut(true); } 
              else { if(usuario.Rol === "Vendedor" && usuario.Estado === "Autorizado") { setSellerAut(true); } }
            } 
          });                 
      } ); 
    }  
  }, [user, isAuthenticated]);

  function error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      showConfirmButton: false,
      timer: isAuthenticated && adminAut ? 1 : false,
      text: 'Tu NO estas autorizado para ingresar a esta area!!!',      
      footer: isAuthenticated ? null : `<a href="/">Autenticate!!! Da Click aqui para iniciar Sesion</a>` 
    });
  }
  function showRol() {
    Swal.fire({
      icon: 'success',
      title: `Binevenid@, ya  has sido registrado${ adminAut ? `. Eres un Administrador, puedes entrar a todas las opciones de esta aplicacion.` : 
        sellerAut ? ', tu Rol es de Vendedor, puedes entrar a la seccion solo de gestion de ventas.' : 
        ' Tu solicitud esta pendiente por ser autorizada, por ahora no puedes acceder a las herraminetas de esta aplicacion.'  }`
    });
  }
  return (    
    <Router>
      { isAuthenticated ? <Navbar /> : null }      
      <Switch>
        <Route path="/" exact>
          { isAuthenticated ? <WelcomePage /> : <LoginPage /> }
          { isAuthenticated ? showRol() : null }
        </Route>
        <Route path='/productos' exact>
          { isAuthenticated && adminAut ? <ProductsPage /> : () => { error(); } }
        </Route>
        <Route path='/usuarios' exact>
          { isAuthenticated && adminAut ? <UsersPage /> : () => { error(); } }
        </Route>        
        <Route path='/ventas' exact>
          { isAuthenticated && (adminAut || sellerAut) ? <SalesPage /> : () => { error(); } }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
