import React, { Component } from 'react';
import Menu from "./../menu/menu";
import './registro.scss';
import FormularioUser from "../formularioUsuario/formularioUsuario";
import FormularioModelo from "../formularioModelo/formularioModelo"
class Registro extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center cover">
            <div className="yellow-container"></div>
               <Menu {...this.props}></Menu>
             {(this.props.tipo.id) ? <FormularioModelo {...this.props}/> : <FormularioUser {...this.props}/>}  >
            </div>
        );
    }
}
export default Registro;