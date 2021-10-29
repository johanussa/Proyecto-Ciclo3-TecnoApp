import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-1wfdh4zr.us.auth0.com"
    clientId="2yUxS7NlYfGygfAYPsKE23OfxpMj58Mn"
    redirectUri={window.location.origin} >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

