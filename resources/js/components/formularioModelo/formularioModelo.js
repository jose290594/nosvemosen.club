import React, { Component } from 'react';
import axios from 'axios';
import './formularioModelo.scss';
import $ from 'jquery';
import Load from './../loading/load';
class FormularioModelo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: 'notload',
            nombres: '',
            apellidos: '',
            correo: '',
            dni: '',
            numero: '',
            provincia: 'Buenos Aires',
            ciudad: 'CABA',
            contra: '',
            verificar: '',
            whatsapp: '',
            estatura: '',
            edad: 0,
            medidas: '',
            busto: '32 Copa A',
            piel: '',
            cabello: '',
            ojos: '',
            orientacion: 'Heterosexual',
            preferencia: 'Hombres',
            talla_pie: '',
            guardado: false,
            ruta: ''
        }
        this.file = React.createRef();
        this.img = React.createRef();
    }
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });

    }
    handleChangeCorreo = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }
    send = (event) => {
        if (this.state.guardado) { }
        const data = {
            nombre: this.state.nombres,
            apellidos: this.state.apellidos,
            provincia: this.state.provincia,
            ciudad: this.state.ciudad,
            numero: this.state.numero,
            contra: this.state.contra,
            correo: this.state.correo,
            dni: this.state.dni,
            whatsapp: this.state.whatsapp,
            estatura: toString(this.state.estatura),
            edad: this.state.edad,
            medidas: this.state.medidas,
            busto: this.state.busto,
            piel: this.state.piel,
            cabello: this.state.cabello,
            ojos: this.state.ojos,
            orientacion: this.state.orientacion,
            preferencia: this.state.preferencia,
            img: this.state.ruta,
            talla_pie: this.state.talla_pie
        }
        console.log(this.state.preferencia);
        const headers = {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        this.setState({ load: 'onload' });
        axios.post('/api/modelo/registro', data, headers).then((data) => {
            this.recieve(data)
        }).catch((error) => {
            this.setState({ load: 'notload' });
            alert("uno o mas campos vacios");
            console.log(error.response);
        });
    }
    check = () => {
        event.preventDefault();
        if (this.checkCorreo() && this.checkPassword()) {
          //  this.send();
          console.log("todo bien")
        }
    }
    checkCorreo = () => {
        let erCorreo = new RegExp(
            "[a-zA-Z0-9_.-]+@+[a-zA-Z0-9_.-]+.+[a-zA-Z]{2,4}"
        );
        if (this.state.correo === "") {
            alert("El correo no puede estar vacío");
            return false;
        } else if (!erCorreo.test(this.state.correo)) {
            alert("El correo tiene un formato incorrecto");
            return false;
        } else {
            return true;
        }
    }
    checkPassword=()=>{
        if(this.state.contra===this.state.verificar){
            return true;
        }
        else{
            alert("contrasenas no coinciden");
            return false;
        }
    }
    checkEstatura = () => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
        clearTimeout();
        setTimeout(() => {
            if (this.state.value === 0) {
            } else {
                if (this.state.value % 1 === 0) {
                    alert("formato de medidas incorrecto ejemplo:1.60");
                }
            }
        }, 2000);
    }
    recieve = (data) => {
        this.setState({ load: 'notload' });
        alert("registrado exitosamente");
        this.props.history.push('/bienvenido/modelo');
        console.log(data);
    }

    sendImg = () => {
        let data = new FormData();
        let img = this.file.current.files[0];
        data.append("img", img);
        data.append("lol", 'lol');
        axios.post('/api/modelo/registro/img', data).then((data) => {
            console.log(data.data.save);
            let rutas = data.data.save.split('/');
            this.img.current.innerText = "Recibido!";

            let ruta = `${rutas[2]}/${rutas[3]}/${rutas[3]}`;
            console.log(ruta);
            this.setState({ guardado: true, ruta: ruta });
        }).catch(function (error) {
            console.log(error.response)
        });
    }
    render() {
        return (
            <div className="form-container center" >
                <form className="form center column" onSubmit={this.check}>
                    <Load load={`${this.state.load}`} />
                    <h1>Bienvenido!</h1>
                    <h3>ingrese sus datos como nueva Modelo</h3>
                    <h5>AVISO! la aprobacion del perfil como proveedora puede tardar hasta 24 horas</h5>
                    <div className="items-container center column start">
                        <h4>datos Personales</h4>
                        <div className="center">
                            <div className="items center column">
                                <label >Nombre:</label>
                                <input type="text" name="nombres" value={this.state.nombres} onChange={this.handleChange} />
                                <label>Apellido:</label>
                                <input type="text" name="apellidos" value={this.state.apellidos} onChange={this.handleChange} />
                                <label value="">Provincia:</label>
                                <select name="provincia" value={this.state.provincia} onChange={this.handleChange}>
                                    <option value="Buenos Aires">Buenos Aires</option>
                                </select>
                                <label value="">Ciudad:</label>
                                <select name="ciudad" value={this.state.ciudad} onChange={this.handleChange}>
                                    <option value="CABA">CABA</option>
                                </select>
                                <label value="">Correo electrónico:</label>
                                <input type="email" name="correo" value={this.state.correo} onChange={this.handleChangeCorreo} />
                            </div>
                            <div className="items center column">
                                <label>DNI</label>
                                <input type="text" value={this.state.dni} onChange={this.handleChange} name="dni" />
                                <label value="" >Numero de teléfono:</label>
                                <input type="number" name="numero" value={this.state.numero} onChange={this.handleChange} />
                                <label value="">WhatsApp:</label>
                                <input type="number" name="whatsapp" value={this.state.whatsapp} onChange={this.handleChange} />
                                <label value=""> Contraseña:</label>
                                <input type="password" name="contra" value={this.state.contra} onChange={this.handleChange} />
                                <label value=""> Repetir contraseña:</label>
                                <input type="password" name="verificar" value={this.state.verificar} onChange={this.handleChange} />
                            </div>
                        </div>
                        <h4>Descripcion fisica </h4>
                        <h5>algunos campos como la estatura y busto te ayudaran a aparecer en las busquedas</h5>
                        <div className="center">
                            <div className="items center column">
                                <label value="">  estatura</label>
                                <input type="number" name="estatura" placeholder="opcional ejem: 1.80" value={this.state.estatura} onChange={this.checkEstatura} />

                                <label value="">color de cabello</label>
                                <input type="text" name="cabello" placeholder="opcional" value={this.state.cabello} onChange={this.handleChange} />
                                <label value="">talla de pie</label>
                                <input type="text" name="talla_pie" placeholder="opcional" value={this.state.talla_pie} onChange={this.handleChange} />
                            </div>
                            <div className="items center column">
                                <label value=""> color de piel </label>
                                <input type="text" name="piel" placeholder="opcional" value={this.state.piel} onChange={this.handleChange} />

                                <label value="">medidas</label>
                                <input type="text" name="medidas" placeholder="opcional" value={this.state.medidas} onChange={this.handleChange} />
                                <label value=""> color de ojos </label>
                                <input type="text" name="ojos" placeholder="opcional" value={this.state.ojos} onChange={this.handleChange} />
                                <label>busto</label>
                                <select name="busto" value={this.state.busto} onChange={this.handleChange}>
                                    <option value="A32">32 Copa: A</option>
                                    <option value="A34">34 Copa: A</option>
                                    <option value="A36">36 Copa: A</option>
                                    <option value="A38">38 Copa: A</option>
                                    <option value="A40">40 Copa: A</option>
                                    <option value="B32">32 Copa: B</option>
                                    <option value="B34">34 Copa: B</option>
                                    <option value="B36">36 Copa: B</option>
                                    <option value="B38">38 Copa: B </option>
                                    <option value="B40">40 Copa: B</option>
                                    <option value="C32">32 Copa: C</option>
                                    <option value="C34">34 Copa: C</option>
                                    <option value="C36">36 Copa: C</option>
                                    <option value="C38">38 Copa: C</option>
                                    <option value="C40">40 Copa: C</option>
                                    <option value="D32">32 Copa:  D</option>
                                    <option value="D34">34 Copa:  D</option>
                                    <option value="D36">36 Copa:  D</option>
                                    <option value="D38">38 Copa:  D </option>
                                    <option value="D40">40 Copa:  D</option>
                                </select>
                            </div>
                        </div>
                        <h4>acerca de ti</h4>
                        <div className="center">
                            <div className="items center column">
                                <label>orientacion sexual</label>
                                <select name="orientacion" value={this.state.orientacion} onChange={this.handleChange}>
                                    <option value="Heterosexual">Heterosexual</option>
                                    <option value="Lesbiana">Lesbiana</option>
                                    <option value="Bisexual">Bisexual</option>
                                </select>
                                <label>preferencia</label>
                                <select name="preferencia" value={this.state.preferencia} onChange={this.handleChange}>
                                    <option value="Mujeres">Mujeres</option>
                                    <option value="Hombres">Hombres</option>
                                </select>
                            </div>
                            <div className="items center column">
                                <label value=""> edad </label>
                                <input type="number" name="edad" placeholder="opcional" value={this.state.edad} onChange={this.handleChange} />
                            </div>
                        </div>

                        <h4>Foto de Perfil (requerido)</h4>
                        <div className="drag-container center" style={{ background: `url(../../${this.state.ruta})` }}  >
                            <input id="file" name="file" type="file" onChange={this.sendImg} ref={this.file} />

                            <div className="drag-text" >
                                <h6 ref={this.img}>arrastra tu imagen</h6>
                            </div>
                        </div>
                        <button className="boton" type="submit">Registrar!</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default FormularioModelo;