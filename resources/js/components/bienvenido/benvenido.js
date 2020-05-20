import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import './bienvenido.scss';
class Bienvenido extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="Web_1920___1" className="center row">
                <div className="img">
                </div>
                <div id="Bienvenidos" className="center">
                    <span>BIENVENIDO A</span>
                </div>
                <div className="_Lorem_ipsum_dolor_sit_amet__c center center-column">
                <div className="logo-container-inicio">
                        <div className="logo-inicio">
                        </div>
                    </div>
                    <span> EL PRIMER SITIO QUE TRABAJA PARA QUE LA COMPAÑIA TE BUSQUE A VOS </span>
                    <span>este sitio contiene material adulto</span>
                </div>
                    <div className="center separate">
                        <div className="link-wrapper center">
                            <Link className="link center" to="bienvenido/usuario"><span className="spot"></span> INGRESAR COMO USUARIO</Link>
                             <Link className="link center" to="bienvenido/modelo"><span className="spot"></span> INGRESAR COMO MODELO</Link>
                        </div>
                    </div>
            </div>
        );
    }
}
export default Bienvenido;

