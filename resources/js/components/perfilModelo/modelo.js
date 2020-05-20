import React, { Component } from 'react';

import Menu from "./../menu/menu";
import axios from 'axios';
import "./modelo.scss"
import Load from './../loading/load';
class Modelo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            img: 'images/tipa1.png',
            modelo: {
                nombres: '',
                apellidos: '',
                correo: '',
                dni: '',
                numero: '',
                provincia: '',
                ciudad: '',
                whatsapp: '',
                estatura: '',
                edad: '',
                medidas: '',
                busto: '',
                piel: '',
                cabello: '',
                ojos: '',
                orientacion: '',
                preferencia: '',
                talla_pie: ''
            },
            parametro: 0,
            load: 'notload',
        };
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
        if (user) {
            if (this.props.match.params.modelo == 0) {
                this.aleatorio(user);
            } else {
                this.solicitar(user);
                console.log('normal')
            }
        } else {
            this.props.history.push("/");
        }


    }
    aleatorio = (user) => {
        let data = {
            user: this.props.match.params.modelo,
            token: user.token,
            userid: user.user.id,
            aleatorio: true,
            id:  user.user.tipo
        }
        this.setState({ load: 'onload' });
        axios.post('/api/modelo/aleatorio', data).then((data) => {
            this.imprimir(data);
        }).catch((error) => { console.log(error.response) })
    }
    solicitar = (user) => {
        let data = {
            user: this.props.match.params.modelo,
            token: user.token,
            userid: user.user.id,
            aleatorio: false,
            id: user.user.tipo
        }
        this.setState({ load: 'onload' });
        axios.post('/api/modelo/perfil', data).then((data) => {
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
            modelo: {
                nombres: res.data.user.nombres,
                apellidos: res.data.user.apellidos,
                dni: res.data.user.DNI,
                correo: res.data.user.correo,
                numero: res.data.user.numero,
                provincia: res.data.user.provincia,
                ciudad: res.data.user.ciudad,
                whatsapp: res.data.user.whatsapp,
                estatura: res.data.user.estatura,
                edad: res.data.user.edad,
                medidas: res.data.user.medidas,
                busto: res.data.user.busto,
                piel: res.data.user.piel,
                cabello: res.data.user.cabello,
                ojos: res.data.user.ojos,
                orientacion: res.data.user.orientacion,
                preferencia: res.data.user.preferencia,
                talla_pie: res.data.user.talla_pie
            },
            img: res.data.user.img
        });
    }
    render() {
        return (
            <div className="center cover">
                <Menu />
                <div className="content-wrap center inicio">
                    <Load load={`${this.state.load}`} />
                    <div className="info-wrapper center">
                        <div className="modelo-wrapper">
                            <div className="modelo" style={{ background: `url(../../../${this.state.img}) ` }}>
                            </div>
                        </div>
                        <div className="l">
                            <div className="info">
                                <div className="head">
                                    <h3>sobre mi</h3>
                                </div>
                                <p>nombres:{this.state.modelo.nombres}</p>
                                <p>apellidos:{this.state.modelo.apellidos} </p>
                                <p>correo:{this.state.modelo.correo}</p>
                                <p>edad:{this.state.modelo.edad} </p>

                            </div>
                            <div className="info">
                                <div className="head">
                                    <h3>Contacto</h3>
                                </div>
                                <p>numero:{this.state.modelo.numero}</p>
                                <p>Provincia:{this.state.modelo.provincia}</p>
                                <p>ciudad:{this.state.modelo.ciudad}</p>
                                <p>whatsapp:{this.state.modelo.whatsapp}</p>

                            </div>
                            <div className="info">
                                <div className="head">
                                    <h3>Fisico</h3>
                                </div>
                                <p>estatura:{this.state.modelo.estatura}</p>
                                <p>medidas: {this.state.modelo.medidas} </p>
                                <p>busto:{this.state.modelo.busto}</p>
                                <p>piel: {this.state.modelo.piel}</p>
                                <p>cabello: {this.state.modelo.cabello}</p>
                                <p>ojos:{this.state.modelo.ojos}</p>
                                <p>orientacion: {this.state.modelo.orientacion}</p>
                                <p>preferencia:{this.state.modelo.preferencia}</p>
                                <p>talla_pie:  {this.state.modelo.talla_pie}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Modelo;