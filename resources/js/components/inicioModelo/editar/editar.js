import React, { Component } from 'react';

class Editar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            img: '',
            nombres: '',
            apellidos: '',
            correo: '',
            dni: '',
            numero: '',
            provincia: 'Buenos Aires',
            ciudad: 'CABA',
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
            talla_pie: '',
            parametro: 0
        };
    }
    componentDidMount() {
        this.setState({
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
            talla_pie: this.props.data.talla_pie,
            img: this.props.img
        })

    }
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }
    send = () => {
        this.props.handleChange(this.state)
    }
    render() {
        return (
            <div className="l center center-column">
                <div className="info">
                    <div className="head">
                        <h3>SOBRE MI</h3>
                    </div>
                    <p>nombres : <input type="text" name="nombres" onChange={this.handleChange} value={this.state.nombres} /></p>
                    <p>apellidos : <input type="text" name="apellidos" onChange={this.handleChange} value={this.state.apellidos} /></p>
                    <p>correo : <input type="text" name="correo" onChange={this.handleChange} value={this.state.correo} /></p>
                    <p>dni : <input type="text" name="dni" onChange={this.handleChange} value={this.state.dni} /> </p>
                    <p>edad : <input type="text" name="edad" onChange={this.handleChange} value={this.state.edad} /> </p>
                </div>
                <div className="info">
                    <div className="head">
                        <h3>CONTACTO</h3>
                    </div>
                    <p>numero : <input type="text" name="numero" onChange={this.handleChange} value={this.state.numero} /></p>
                    <p>provincia :<select name="provincia" value={this.state.provincia} onChange={this.handleChange}><option value="Buenos Aires">Buenos Aires</option></select></p>
                    <p>ciudad:<select name="ciudad" value={this.state.ciudad} onChange={this.handleChange}><option value="CABA">CABA</option></select></p>
                    <p>whatsapp : <input type="text" name="whatsapp" onChange={this.handleChange} value={this.state.whatsapp} /></p>

                </div>

                <div className="info">
                    <div className="head">
                        <h3>FISICO</h3>
                    </div>
                    <p>estatura : <input type="text" name="estatura" onChange={this.handleChange} value={this.state.estatura} /></p>
                    <p>medidas : <input type="text" name="medidas" onChange={this.handleChange} value={this.state.medidas} /> </p>
                    <p>busto :
                    <select name="busto" value={this.state.busto} onChange={this.handleChange}>
                            <option value="32 A ">32 Copa: A</option>
                            <option value="34 A ">34 Copa: A</option>
                            <option value="36 A ">36 Copa: A</option>
                            <option value="38 A ">38 Copa: A</option>
                            <option value="40 A ">40 Copa: A</option>
                            <option value="32 B ">32 Copa: B</option>
                            <option value="34 B ">34 Copa: B</option>
                            <option value="36 B ">36 Copa: B</option>
                            <option value="38 B ">38 Copa: B </option>
                            <option value="40 B ">40 Copa: B</option>
                            <option value="32 C ">32 Copa: C</option>
                            <option value="34 C ">34 Copa: C</option>
                            <option value="36 C ">36 Copa: C</option>
                            <option value="38 C ">38 Copa: C</option>
                            <option value="40 C ">40 Copa: C</option>
                            <option value="32 D ">32 Copa:  D</option>
                            <option value="34 D ">34 Copa:  D</option>
                            <option value="36 D ">36 Copa:  D</option>
                            <option value="38 D ">38 Copa:  D </option>
                            <option value="40 D ">40 Copa:  D</option>
                        </select></p>
                    <p>piel : <input type="text" name="piel" onChange={this.handleChange} value={this.state.piel} /></p>
                    <p>cabello : <input type="text" name="cabello" onChange={this.handleChange} value={this.state.cabello} /></p>
                    <p>ojos : <input type="text" name="ojos" onChange={this.handleChange} value={this.state.ojos} /></p>
                    <p>orientacion sexual:  <select name="orientacion" value={this.state.orientacion} onChange={this.handleChange}>
                        <option value="Heterosexual">Heterosexual</option>
                        <option value="Lesbiana">Lesbiana</option>
                        <option value="Bisexual">Bisexual</option>
                    </select>
                    </p>
                    <p>preferencia :  <select name="preferencia" value={this.state.preferencia} onChange={this.handleChange}>
                        <option value="Mujeres">Mujeres</option>
                        <option value="Hombres">Hombres</option>
                    </select>
                    </p>
                    <p>talla_pie:  <input type="text" name="talla_pie" onChange={this.handleChange} value={this.state.talla_pie} /></p>
                </div>
                <button className="editar center" style={{ margin: '0 0 1rem 0' }} onClick={this.send}> confirmar</button>
            </div>
        );
    }
}

export default Editar;