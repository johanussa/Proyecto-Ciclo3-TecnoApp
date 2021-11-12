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
      axios.get('http://localhost:3001/api/usuarios')
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
      text: 'Tu NO estas autorizado para ingresar a esta area!!!',
      footer: isAuthenticated ? null : `<a href="/">Autenticate!!! Da Click aqui para iniciar Sesion</a>` 
    });
  }
  return (    
    <Router>
      { isAuthenticated ? <Navbar /> : null }      
      <Switch>
        <Route path="/" exact>
          { isAuthenticated ? <WelcomePage /> : <LoginPage /> }</Route>
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
