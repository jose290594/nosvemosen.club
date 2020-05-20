import React, { Component } from 'react';
import ImgBox from "./../img-box/img-box";
import Menu from "./../menu/menu";
import Leer from "./leer/leer";
import axios from 'axios';
import "./inicioM.scss";
import Editar from "./editar/editar";
import Load from './../loading/load';
import Agregar from "./agregar/agregar";
class InicioModelo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recivido: false,
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
            editar: false,
            galeria: [],
            load: 'notload'
        };
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) :null ;
        if(user){
            this.solicitar(user);
        }else{
            this.props.history.push("/");
        }
    }
    solicitar = (user) => {
        let data = {
            user: user.user.id,
            token: user.token,
            id: 1
        }
        this.setState({ load: 'onload' });
        axios.post('/api/modelo/perfil', data).then((data) => {
            console.log(data)
            this.imprimir(data);
        }).catch((error) => { console.log(error.response) })
    }
    procesar = (rutas) => {
        let estaruta = rutas.split('/');
        let ruta = `${estaruta[2]}/${estaruta[3]}/${estaruta[3]}`;
        return ruta;
    }
    imprimir = (res) => {

        if (res.data.log) {
            this.setState({ load: 'notload' });
            let galeria = [];
            let push;
            let e;
            galeria.push(res.data.user.img);
            for (e = 0; e <= 4; e++) {
                push = (res.data.imagenes[e]) ? this.procesar(res.data.imagenes[e]) : '';
                galeria.push(push);
            }
            this.setState({
                editar: false,
                modelo: {
                    nombres: res.data.user.nombres,
                    apellidos: res.data.user.apellidos,
                    dni: res.data.user.DNI,
                    correo: res.data.user.correo,
                    numero: res.data.user.numero,
                    ciudad: res.data.user.ciudad,
                    provincia: res.data.user.provincia,
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
                galeria: galeria,
                agregar: false,
                recivido: true,
                img: res.data.user.img
            })
            console.log(this.state);

        } else {
            //   this.setState({ load: 'notload' });
            this.props.history.push("/");
        }
    }
    toggle = () => {
        if (this.state.editar) {
            this.setState({ editar: false });

        } else {
            this.setState({ editar: true });
        }
    }
    confirmar = () => {
    }
    handleChange = (data) => {
        let user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) :null ;
        if(user){
            let req = {
                user: user.user.id,
                nombres: data.nombres,
                apellidos: data.apellidos,
                dni: data.dni,
                correo: data.correo,
                numero: data.numero,
                ciudad: data.ciudad,
                provincia: data.provincia,
                whatsapp: data.whatsapp,
                estatura: data.estatura,
                edad: data.edad,
                medidas: data.medidas,
                busto: data.busto,
                piel: data.piel,
                cabello: data.cabello,
                ojos: data.ojos,
                orientacion: data.orientacion,
                preferencia: data.preferencia,
                talla_pie: data.talla_pie,
                token: user.token,
                id: 1
            }
            this.setState({ load: 'onload' });
            axios.post('/api/modelo/perfil/editar', req).then((data) => {
                this.imprimir(data);
            }).catch((error) => { console.log(error.response) })
        }else{
            this.props.history.push("/");
        }
        
    }
    cancelar = () => {
        this.setState({
            agregar: false
        })
    }
    enviar = (item) => {

    }
    mostrar = () => {
        this.setState({ agregar: true });
    }
    render() {
        const Modo = () => {
            return ((this.state.editar) ? <Editar data={this.state.modelo} handleChange={this.handleChange} confirmar={this.confirmar} img={this.state.img} /> : <Leer img={this.state.img} data={this.state.modelo} />)
        }
        const Datos = () => {
            return ((this.state.recivido) ? <Modo /> : <p />)
        }
        const Imagen = () => {
            return (
                <div className="modelos-wrapper">
                    <div className="modelo" style={{ background: `url(../../../${this.state.img}) ` }}>
                    </div>
                </div>
            )
        }
        const TextBoton = () => {
            return ((this.state.editar) ? "cancelar" : "editar")
        }
        return (
            <div className="center cover">
                <Agregar solicitar={this.solicitar} mostrar={this.state.agregar} enviar={this.enviar} cancelar={this.cancelar} />
                <Menu {...this.props}  />
                <div className="content-wrap center" >
                    <div className="info-wrapper center inicio">
                        <Load load={`${this.state.load}`} />
                        <div className="center center-column">
                            <Imagen />
                            <div className="galeria center">
                                {this.state.galeria.map((item) => {
                                    return <ImgBox class={'miniuserImg-box'} img={item} />
                                })}
                            </div>
                            <button className="editar center" onClick={this.mostrar}  >nueva foto<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg></button>
                        </div>
                        <div className="center center-column" >
                            <Datos />
                            <div className="center center-column">
                                <button className="editar center" onClick={this.toggle}><TextBoton /><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default InicioModelo;