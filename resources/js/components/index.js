import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import Bienvenido from './bienvenido/benvenido';
import Inicio from "./inicio/inicio";
import Usuario from "./perfilUsuario/usuario";
import Registro from "./registro/registro";
import Login from "./login/login";
import Modelo from "./perfilModelo/modelo";
import InicioModelo from "./inicioModelo/inicioModelo";
const datamodelo = {
    titulo:"Modelo",
    id:1
}
const datausuario = {
    titulo:"Usuario",
    id:0
}
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
         };
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={props => <Bienvenido {...props} />} />
                    <Route path="/bienvenido/usuario" render={props => <Login {...props} tipo={datausuario} />} />
                    <Route path="/bienvenido/modelo" render={props => <Login {...props}  tipo={datamodelo} />} />
                    <Route path="/registro/usuario" render={props => <Registro tipo={datausuario}  {...props}/>} />
                    <Route path="/registro/modelos" render={props => <Registro tipo={datamodelo}  {...props}/>} />
                    <Route path="/inicio/usuario" render={props => <Inicio {...props}/>} />
                    <Route path="/inicio/modelo" render={props => <InicioModelo {...props}/>} />
                    <Route path="/perfil/usuario" render={props => <Usuario {...props}/>} />
                    <Route path="/perfil/modelo/usuario/:modelo" render={props => <Modelo {...props}/>} />
                </Switch>
            </Router>
        );
    }
}


ReactDOM.render(<Index />, document.getElementById('app'));