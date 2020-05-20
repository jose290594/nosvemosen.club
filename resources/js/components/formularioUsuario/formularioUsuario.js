import React, { Component } from 'react';
import axios from 'axios';
import './formulario.scss';
import Load from './../loading/load';
class FormularioUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombres:'',
            apellidos :'',
            correo:'',
            numero:'',
            direccion:'',
            contra:'',
            verificar:'',
            load: 'notload',
            whatsapp:''
        }
    }
    handleChange = (event) =>{
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name] : value})
    }
    send = (event) =>{
        const data = {
            nombre:this.state.nombres,
            apellidos:this.state.apellidos,
            direccion:this.state.direccion,
            numero:this.state.numero,
           password:this.state.contra,
            correo:this.state.correo,
            whatsapp:this.state.whatsapp
        }
        console.log(data)
        this.setState({ load: 'onload' });
          axios.post('/api/usuario/registro',data).then(function(data){
              alert('registrado exitosamente');
              this.props.history.push('bienvenido/usuario');
            console.log(data);
        }).catch(function(error){
            console.log(error)
        });
    }
    render() {
        return (
            <div className="usuarioform-container center">
                <div className="usuarioform center column">
                <Load load={`${this.state.load}`} />
                    <h1>Bienvenido!</h1>
                    <h3>ingrese sus datos como nuevo usuario</h3>
                    <div className="items-container center column start">
                        <div className="center">
                            <div className="items center column">
                                <label   >Nombre:</label>
                                <input type="text" name="nombres" value={this.state.nombres} onChange={this.handleChange} />
                                <label  >Apellido:</label>
                                <input type="text" name="apellidos"  value={this.state.apellidos} onChange={this.handleChange}/>
                            </div>
                            <div className="items center column">
                                <label   value="">Correo electrónico:</label>
                                <input type="email" name="correo" value={this.state.correo} onChange={this.handleChange}/>
                                <label   value="" >Numero de teléfono:</label>
                                <input type="number" name="numero" value={this.state.numero} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="center">
                            <div className="items center column">
                                <label  value="">  Dirección:</label>
                                <input type="text" name="direccion" value={this.state.direccion} onChange={this.handleChange} />
                                <label  value=""> Contraseña:</label>
                                <input type="password" name="contra" value={this.state.contra} onChange={this.handleChange} />
                            </div>
                            <div className="items center column">
                                <label  value=""> Repetir contraseña:</label>
                                <input type="password" name="verificar" value={this.state.verificar} onChange={this.handleChange}/>
                                <label  value="">WhatsApp:</label>
                                <input type="number" name="whatsapp" value={this.state.whatsapp} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <button className="boton" onClick={this.send}>Registrar!</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default FormularioUser;