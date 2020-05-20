import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Load from './../loading/load';
import Alert from './../alert-Box/alert-box'
import './login.scss';
const registro = {
    modelos: "/registro/modelos",
    usuario: "/registro/Usuario"
}
const ruta = {
    modelo: "/inicio/modelo/",
    usuario: "/inicio/usuario"
}
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            mensaje: 'prueba',
            password: '',
            correo: '',
            load: 'notload',
            isLoggedIn: false,
            ruta: (this.props.tipo.id) ? ruta.modelo : ruta.usuario
        }
    }
    componentDidMount() {
    }
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value })
    }
    login = () => {
        if (this.state.password) {
            this.enviar();
        } else {
            alert(' 1 o mas campos vacios')
        }

    }
    enviar = () => {
        this.setState({ load: 'onload' });
        let data = {
            password: this.state.password,
            correo: this.state.correo,
            id: this.props.tipo.id
        }

        axios.post('/api/usuario/login', data).then((data) => {

            this.procesar(data);
            console.log(data)

        }).catch((error) => {
            this.setState({ load: 'notload' });
            console.log(error.response);
            alert("ha ocurrido un error intente nuevamente");
        });
    }
    procesar = (data) => {
        this.setState({ load: 'notload' });
        if (data.data.data.auth_token) {
            let user = {
                correo: data.data.data.correo,
                id: data.data.data.user_id,
                tipo:data.data.data.tipo,
                nombre: data.data.data.nombre
            };
            let ruta = this.state.ruta;
            let datas = {
                token: data.data.data.auth_token,
                tipo: this.props.tipo.id,
                user: user
            };
            localStorage.setItem('user', JSON.stringify(datas));
            this.props.history.push(ruta);
        } else {
            alert("correo o contrasena invalido")
        }
    }

    render() {
        return (
            <div id="Web_1920___1" className="center row">
                <Alert show={this.state.show} mensaje={this.state.mensaje} />
                <div className="img">
                </div>
                <div id="Bienvenidos" className="center log">
                    <span>BIENVENIDO!</span>
                </div>
                <div className="login-box center center-column">
                    <h3>{this.props.tipo.titulo}</h3>
                    <div className="login-wrapper center center-column center-side">
                        <label>Correo </label>
                        <input type="email" name="correo" placeholder="maria@correo.com" onChange={this.handleChange} value={this.state.correo} ></input>
                    </div>
                    <Load load={`${this.state.load}`} />
                    <div className="login-wrapper center center-column center-side">
                        <label>Contraseña</label>
                        <input type="password" placeholder="123churrito" name="password" onChange={this.handleChange} value={this.state.password}></input>
                    </div>
                    <Link to={(this.props.tipo.id) ? registro.modelos : registro.usuario}>Registrate!</Link>
                    <button type="button" onClick={this.login}>Ingresar</button>
                </div>
            </div>
        );
    }
}
export default Login;

