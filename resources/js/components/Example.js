import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick:'',
            direccion:'',
            telefono:'',
            dni:'',
            correo:'',
            usuario:0
        }
        
    }
    handleChange = (event) =>{
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name] : value})
    }
    Submit = (event) => {
        event.preventDefault();
        const data = {
            nick:this.state.nick,
            direccion:this.state.direccion,
            telefono:this.state.telefono,
            DNI:this.state.dni,
            correo:this.state.correo,
            usuario:0
        }
        const headers= {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        axios.post('/usuario',data,headers).then(function(data){
            console.log(data);
        }).catch(function(error){
            console.log(error)
        });
    }

    render() {
        return (
           <form onSubmit={this.Submit}>
               <input type="text" name="nick"  value={this.state.nick} placeholder="nick" onChange={this.handleChange} ></input>
               <input type="text"name="direccion"  value={this.state.direccion} placeholder="direccion" onChange={this.handleChange}></input>
               <input type="text" name="telefono" value={this.state.telefono} placeholder="telefono" onChange={this.handleChange}></input>
               <input type="text" name="dni" value={this.state.dni} placeholder="DNI" onChange={this.handleChange}></input>
               <input type="text" name="correo" value={this.state.correo} placeholder="correo" onChange={this.handleChange}></input>
               <button type="submit">holi</button>
           </form>
        );
    }
}



