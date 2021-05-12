
/**este componente es el d*/ 
import React, { Component, useState } from 'react';
//import logo from './efe.ico';
//555
import CargaMasiva from './components/CargaMasivaComponent';
import REGISTRO from './components/RegisterController';
import LOGIN from './components/LoginComponent';
import "primereact/resources/themes/saga-orange/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
const inputYML = 'input.yml' ;
const outputJSON = 'salida.json' ;
const yaml = require ( 'js-yaml' );
const fs = require ( 'fs' );


const App = () => {
  const [Title, setTitle] = useState('');
  const [Show, setShow] = useState(false);
  const [User, setUser] = useState('');
  const [Admin, setAdmin] = useState(false);
  function cambiar(){
    setShow(Show?false:true);
  }
  const navbar =(
    <div>
      <div className={`p-2 ${Admin?"d-none":""}`}>
        <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" onClick={cambiar.bind()}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${ Show?"show":""}`} id="navbarSupportedContent">
            <ul className={`navbar-nav mr-auto`}>
              <li className={`nav-item ${Title == "LOGIN"?"active":""}`}>
                <a className={`nav-link ${Title == "LOGIN"?"active":""}`} href="/">Login</a>
              </li>
              <li className={`nav-item ${Title == "REGISTRO"?"active":""}`}>
                <a className={`nav-link ${Title == "REGISTRO"?"active":""}`} href="/Registro">Registrarse</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            </form>
          </div>
        </nav>
      </div>
      <div className={`p-2 ${Admin?"":"d-none"}`}>
        <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" onClick={cambiar.bind()}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${ Show?"show":""}`} id="navbarSupportedContent">
            <ul className={`navbar-nav mr-auto`}>
              <li className={`nav-item ${Title == "LOGIN"?"active":""}`}>
                <a className={`nav-link ${Title == "LOGIN"?"active":""}`} href="/">HOME</a>
              </li>
              <li className={`nav-item ${Title == "REGISTRO"?"active":""}`}>
                <a className={`nav-link ${Title == "REGISTRO"?"active":""}`} href="/Registro">Registrarse</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            </form>
          </div>
        </nav>
      </div>
    </div>
  );


    return (
      <Router className>
        <div className="App content-fluid bg-dark vh-100">
          {navbar}
          <Switch>
          <Route path="/CargaMasiva" component={()=> <CargaMasiva setTitle={setTitle}/>}/>
          <Route path="/REGISTRO" component={()=> <REGISTRO setTitle={setTitle}/>}/>
          <Route path="/" component={()=> <LOGIN setTitle={setTitle}/>}/>
           </Switch>
        </div>
      </Router>
    );
}


export default App;
