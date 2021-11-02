import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./components/login/LoginPage";
import SalesPage from "./components/sales/SalesPage";
import UsersPage from "./components/users/UsersPage";
import WelcomePage from "./components/welcome/WelcomePage";
import ProductsPage from "./components/products/ProductsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      { isAuthenticated ? <Navbar /> : null }      
      <Switch>
        <Route path="/" exact>
          { isAuthenticated ? <WelcomePage /> : <LoginPage /> }</Route>
        <Route path='/productos' exact><ProductsPage /></Route>
        <Route path='/usuarios' exact><UsersPage /></Route>
        <Route path='/ventas' exact><SalesPage /></Route>
      </Switch>
    </Router>
  );
}

export default App;
