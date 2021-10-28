import React from "react";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Route path="/" exact>
        <Login />
      </Route>
      <Switch>

      </Switch>
    </Router>
  );
}

export default App;
