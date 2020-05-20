import React, { Component } from 'react';
import Menu from "./../menu/menu";
import Carousel from "./../carousel/carousel";
import ImgBox from "./../img-box/img-box";
import Footer from "./../footer/footer"
import './inicio.scss';
import axios from 'axios';
class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
            user: [],
            list: [],
            busto: 0,
            estatura: 0,
            girar: false,
            cantidad: 0,
            orden: 'id'
        }
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) :null ;
        if(user){
            this.solicitar(this.state.cantidad, this.state.orden,user);
        }else{
            this.props.history.push("/");
        }
    }
    imprimir = (res) => {
        console.log(res)
        if (res.data.user[0].img == null) {
        } else {

            let cantidad = res.data.cantidad;
            let i = 7;
            let e = 0;
            let list = [];
            for (e; e <= i; e++) {
                if (res.data.user[e]) {
                    list.push(res.data.user[e]);
                } else {
                    list.push({
                        img: '',
                        id: e + 1.1,
                        gustos: '',
                        nombres: '',
                        provincia: '',
                        ciudad: '',
                        edad: ''
                    })
                }
            }
            console.log(list)
            this.setState({ list: list, cantidad: cantidad });
        }

    }
    solicitar = (cantidad,orden,user) => {
        let data = {
            user: user.user.id,
            token: user.token,
            id: user.user.tipo,
            cantidad: cantidad,
            estatura: this.state.estatura,
            busto: this.state.busto
        }
        axios.post('/api/modelo/todas', data).then((data) => {
            this.imprimir(data);
        }).catch((error) => { console.log(error.response) });
    }
    moveLeft = () => {
        let cantidad = (this.state.cantidad) ? this.state.cantidad - 8 : 0;
        this.setState({ girar: true });
        this.solicitar(cantidad, this.state.orden);
    }
    moveRight = () => {
        let cantidad = this.state.cantidad + 8;
        this.setState({ girar: true });
        this.solicitar(cantidad, this.state.orden);
    }
    handleChange = () => {
        if (event.target.value) {
            const value = event.target.value;
            const name = event.target.name;
            this.setState({ [name]: value });
            clearTimeout();
            setTimeout(() => {
                this.solicitar(0);
            }, 100)

        }

    }
    ref = (id) => {
        this.props.history.push(`/perfil/modelo/usuario/${id}`);
    }
    render() {
        let counter = 0;
        return (

            <div className="cover">
                <Menu {...this.props} class={"carousel"} ></Menu>
                <div className="center yellow-container">

                </div>

                <Carousel img={this.state} {...this.props} />

                <div className="center center-column ">
                    <div className="center filtros">
                        <div className="select" >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <select name="provincia">
                                <option disabled value="0">provincia</option>
                                <option value="0">Buenos Aires</option>

                            </select> 
                        </div>
                        <div className="select">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <select name="ciudad">
                                <option value="0">ciudad</option>
                                <option value="0">CABA</option>
                            </select>
                            
                        </div>
                        <div className="select">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <select name="estatura" onChange={this.handleChange}>
                                <option value="0">estatura</option>
                                <option value="1">pequenas</option>
                                <option value="2">medianas</option>
                                <option value="3">altas</option>
                            </select>
                            
                        </div>
                        <div className="select">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <select name="busto" onChange={this.handleChange}>
                                <option value="0">Busto</option>
                                <option value="1">Peque;os</option>
                                <option value="2">Medianos</option>
                                <option value="3">Grandes</option>
                            </select>
                            
                        </div>
                    </div>
                    <div className="center cover lista">
                        {(this.state.cantidad) ? <button id="leftb" className="flechitas" onClick={this.moveLeft} >
                            <svg id="ic_arrow_forward_24px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path id="Trazado_3" data-name="Trazado 3" d="M12,4l1.41,1.41L7.83,11H20v2H7.83l5.58,5.59L12,20,4,12Z" transform="translate(-4 -4)" fill="#e2eaf0" />
                            </svg>
                        </button> : <p></p>}
                        <div className="img-list center">
                            {this.state.list.map((item) => {
                                return (<ImgBox class={"userimg-box"} provincia={item.provincia} edad={item.edad} ciudad={item.ciudad} girar={this.state.girar} key={item.id} user={item.id} referir={this.ref} img={item.img} nombre={item.nombres} gusto={item.orientacion} />);
                            })}
                        </div>
                        <button id="rightb" className="flechitas" onClick={this.moveRight} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <g id="ic_arrow_forward_24px" transform="translate(-4 -4)">
                                    <path id="Trazado_3" data-name="Trazado 3" d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" fill="#e2eaf0" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
              <Footer/>
            </div>
        );
    }
}
export default Inicio;