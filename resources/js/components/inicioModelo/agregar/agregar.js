import React, { Component } from 'react';
import axios from 'axios';
import "./agregar.scss";
import Load from './../../loading/load';
class Agregar extends Component {
    constructor(props) {
        super(props);
        this.state ={
            img:'',
            mensaje:'arrastra tu imagen',
            load:'notload',
            guardado:false
        }
        this.files = React.createRef();
    }
    componentDidMount() {
      
    }
    show=(event)=>{
      // this.setState({mensaje:'Recivido' , guardado:true});
       let user = JSON.parse(localStorage.getItem('user'));
        
        let data = new FormData();
        let img = this.files.current.files[0];
        console.log(this.files.current.files);
        data.append("img", img);
        data.append("user", user.user.id);
        data.append("token", user.token);
        this.setState({ load: 'onload' });
        axios.post('/api/modelo/perfil/agregar', data).then((data) => {
            this.props.solicitar();
        }).catch(function (error) {
            console.log(error.response)
        });
    }
    render() {
        const Caja = ()=>{
            return(
            <div className="center cover caja" >
                <div className="center center-column mensaje">
                <Load load={`${this.state.load}`} />
                    <h4>agregar</h4>
                    <h4>Foto de Perfil (requerido)</h4>
                        <div className="drag-container center" ref={this.box} style={{background:``}} >
                            <input id="modelfile" name="modelfile" type="file" ref={this.files} onChange={this.show}/>
                            <div className="draag-text cover center" >
                                <h6>{this.state.mensaje}</h6>
                            </div>
                        </div>
                    <button className="editar center" onClick={this.props.cancelar}>cancelar</button>
                    <button className="editar center" onClick={this.guardar}>guardar</button>
                </div>
            </div>
            )
        }

        const Mostrar = ()=>{return(this.props.mostrar) ? <Caja/> : <p/> }
        return (
            <Mostrar/>
        );
    }
}
export default Agregar;