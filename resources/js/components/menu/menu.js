import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import './menu.scss';
let usuario = '/perfil/usuario';
let modelo = '/inicio/modelo';
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo: 0
        }
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user'));
        this.setState({ tipo: user ? user.user.tipo : 0 });
    }
    cerrarSesion = () => {
        localStorage.removeItem('user');
        this.props.history.push('/');
    }
    render() {

        const ruta = this.state.tipo === 1 ? '/inicio/modelo' : '/perfil/usuario';

        const Perfil = () => {
            return <Link className="Link last" to={`${ruta}`} >MI PERFIL</Link>
        }

        return (

            <div className={`menu-wrapper ${this.props.class}`}>
                <div className="logo-container">
                    <div className="logo">
                    </div>
                </div>
                <div className="links-wrapper">
                    <div className="phone">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="15.405" height="15.405" viewBox="0 0 15.405 15.405">
                            <g id="ic_phone_in_talk_48px" transform="translate(-6 -6)">
                                <path id="Trazado_10" data-name="Trazado 10" d="M20.549,16.7a9.763,9.763,0,0,1-3.055-.488.859.859,0,0,0-.869.21l-1.883,1.887A12.911,12.911,0,0,1,9.1,12.671l1.883-1.887a.859.859,0,0,0,.21-.869,9.79,9.79,0,0,1-.488-3.06A.853.853,0,0,0,9.851,6h-3A.853.853,0,0,0,6,6.856,14.548,14.548,0,0,0,20.549,21.405a.853.853,0,0,0,.856-.856v-3A.853.853,0,0,0,20.549,16.7Zm-.856-3h1.712A7.7,7.7,0,0,0,13.7,6V7.712A5.992,5.992,0,0,1,19.694,13.7Zm-3.423,0h1.712A4.281,4.281,0,0,0,13.7,9.423v1.712A2.57,2.57,0,0,1,16.27,13.7Z" />
                            </g>
                        </svg>
                        <span>000-00000</span>

                    </div>
                    {this.state.tipo ? <Link className="Link" to="/inicio/usuario">INICIO</Link> : <p></p>}
                    {this.state.tipo ? <Link className="Link" to="/perfil/modelo/usuario/0">SORPRENDEME!</Link> : <p></p>}
                    {this.state.tipo ? <Perfil /> : <p></p>}
                    {this.state.tipo ? <button onClick={this.cerrarSesion}>Cerrar Sesion</button> : <p></p>}
                </div>
            </div>

        );
    }
}
export default Menu;