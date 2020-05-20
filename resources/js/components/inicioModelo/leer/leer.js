import React, { Component } from 'react';

class Leer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            img: '',
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
            parametro: 0
        };
    }
    componentDidMount() {
        //  console.log(this.props);
        this.setState({
            modelo: {
                nombres: this.props.data.nombres,
                apellidos: this.props.data.apellidos,
                dni: this.props.data.dni,
                correo: this.props.data.correo,
                numero: this.props.data.numero,
                ciudad: this.props.data.ciudad,
                provincia: this.props.data.provincia,
                whatsapp: this.props.data.whatsapp,
                estatura: this.props.data.estatura,
                edad: this.props.data.edad,
                medidas: this.props.data.medidas,
                busto: this.props.data.busto,
                piel: this.props.data.piel,
                cabello: this.props.data.cabello,
                ojos: this.props.data.ojos,
                orientacion: this.props.data.orientacion,
                preferencia: this.props.data.preferencia,
                talla_pie: this.props.data.talla_pie
            },
            img: this.props.img
        })

    }

    render() {
        return (

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
                    <p>ciudad:{this.state.modelo.ciudad} </p>
                    <p>Provincia:{this.state.modelo.provincia} </p>
                    <p>numero:{this.state.modelo.numero}</p>
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
                    <p>orientacion sexual: {this.state.modelo.orientacion}</p>
                    <p>preferencia:{this.state.modelo.preferencia}</p>
                    <p>talla_pie:  {this.state.modelo.talla_pie}</p>
                </div>
            </div>
        );
    }
}

export default Leer;