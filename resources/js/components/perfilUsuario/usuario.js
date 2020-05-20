import React, { Component } from 'react';

import Menu from "./../menu/menu";
import axios from 'axios';
import "./usuario.scss";
import Load from './../loading/load';
class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            usuario: {
                nombres: '',
                apellidos: '',
                correo: '',
                numero: '',
                whatsapp: ''
            },
            parametro: 0,
            load: 'notload',
        };
    }
    componentDidMount() {
        this.solicitar();
    }
    solicitar = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        let data = {
            token: user.token,
            user: user.user.id
        }
        this.setState({ load: 'onload' });
        axios.post('/api/usuario/perfil', data).then((data) => {
            this.imprimir(data);
        }).catch((error) => {
            console.log(error.response);
            this.setState({ load: 'notload' });
        })
    }
    imprimir = (res) => {
        console.log(res)
        this.setState({ load: 'notload' });
        this.setState({
            usuario: {
                nombres: res.data.user.nombres,
                apellidos: res.data.user.apellidos,
                dni: res.data.user.DNI,
                correo: res.data.user.correo,
                numero: res.data.user.numero,
                whatsapp: res.data.user.whatsapp
            }
        });
    }
    render() {
        return (
            <div className="center cover">
                <Menu />
                <div className="content-wrap center inicio">
                    <Load load={`${this.state.load}`} />
                    <div className="info-wrapper center">
                        {/*<div className="modelo-wrapper">
                            <div className="modelo" style={{ background: `url(../../../${this.state.img}) ` }}>
                            </div>
        </div>*/}
                        <div className="l">
                            <div className="info">
                                <div className="head">
                                    <h3>sobre mi</h3>
                                </div>
                                <p>nombres:{this.state.usuario.nombres}</p>
                                <p>apellidos:{this.state.usuario.apellidos} </p>
                                <p>correo:{this.state.usuario.correo}</p>
                            </div>
                            <div className="info">
                                <div className="head">
                                    <h3>Contacto</h3>
                                </div>
                                <p>numero:{this.state.usuario.numero}</p>
                                <p>whatsapp:{this.state.usuario.whatsapp}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Usuario;