
/**este componente es el d*/ 
import React, { Component, useState } from 'react';
//import logo from './efe.ico';
//555
import CargaMasiva from './components/CargaMasivaComponent';
import Login from './components/LoginComponent';
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
  function cambiar(){
    setShow(Show?false:true);
  }
  const navbar =(
    <div className="p-2">
      <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" onClick={cambiar.bind()}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${ Show?"show":""}`} id="navbarSupportedContent">
          <ul className={`navbar-nav mr-auto`}>
            <li className={`nav-item ${Title == "LOGIN"?"active":""}`}>
              <a className={`nav-link ${Title == "LOGIN"?"active":""}`} href="#">Home</a>
            </li>
            <li className={`nav-item ${Title == "CARGA"?"active":""}`}>
              <a className={`nav-link ${Title == "CARGA"?"active":""}`} href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
          </form>
        </div>
      </nav>
    </div>
  );
    return (
      <Router className>
        <div className="App content-fluid bg-dark vh-100">
          {navbar}
          <Switch>
          <Route path="/CargaMasiva" component={()=> <CargaMasiva setTitle={setTitle}/>}/>
          <Route path="/" component={()=> <Login setTitle={setTitle}/>}/>
           </Switch>
        </div>
      </Router>


    );
}


export default App;
