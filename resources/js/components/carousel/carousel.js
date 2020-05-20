import React, { Component } from 'react';
import './carousel.scss';
import {Link} from "react-router-dom";
import axios from 'axios';
class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
            user: [],
            names:[],
            gustos:[],
            primera: 0,
            segunda: 1,
            tercera: 2,
            link: 2
        }
        this.card1 = React.createRef();
        this.card2 = React.createRef();
        this.card3 = React.createRef();
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) :null ;
        if(user){
            this.solicitar(user);
        }else{
            this.props.history.push("/");
        }
    }
    solicitar(user){
         let data = {
            user: user.user.id,
            token: user.token,
            id: 0
        }
        axios.post('/api/modelo/destacados', data).then((data) => {
            this.imprimir(data);
        }).catch((error) => { console.log(error.response) });
    }
    imprimir = (res) => {
        console.log(res)
        this.setState({ imgs: res.data.img, user: res.data.user,names:res.data.nombres,gustos:res.data.gusto});
        const primera = this.state.primera;
        const segunda = this.state.segunda;
        const tercera = this.state.tercera;
        this.card1.current.style.background = `url(../../${this.state.imgs[tercera]}) `;
        this.card2.current.style.background = `url(../../${this.state.imgs[segunda]}) `;
        this.card3.current.style.background = `url(../../${this.state.imgs[primera]}) `;
        let center = document.querySelector(".centro");
        center.childNodes[1].childNodes[0].innerText = this.state.names[segunda];
        center.childNodes[1].childNodes[1].innerText = this.state.gustos[segunda];
    }
    ref = () => {
        this.props.history.push(`/perfil/modelo/usuario/${this.state.link}`);
    }
    moveRight = () => {
        let primera = this.state.primera;
        let segunda = this.state.segunda;
        let tercera = this.state.tercera;
        let link = this.state.link;
        primera = (primera >= this.state.imgs.length - 1) ? 0 : primera + 1;
        segunda = (segunda >= this.state.imgs.length - 1) ? 0 : segunda + 1;
        tercera = (tercera >= this.state.imgs.length - 1) ? 0 : tercera + 1;
        link = (link > this.state.imgs.length - 1) ? 1 : link + 1;
        this.setState({
            primera: primera,
            segunda: segunda,
            tercera: tercera,
            link: link
        });
        let center = document.querySelector(".centro");
        let right = document.querySelector(".right");
        let left = document.querySelector(".left");

        left.classList.remove("left");
        left.classList.add("centro");
        right.classList.remove("right");
        right.classList.add("left");
        center.classList.remove("centro");
        center.classList.add("right");
        center.childNodes[0].style.background = `url(../../${this.state.imgs[primera]}) `;
        right.childNodes[0].style.background = `url(../../${this.state.imgs[tercera]}) `;
        left.childNodes[0].style.background = `url(../../${this.state.imgs[segunda]}) `;
        left.childNodes[1].childNodes[0].innerText = this.state.names[segunda];
        left.childNodes[1].childNodes[1].innerText = this.state.gustos[segunda];
    }

    moveLeft = () => {
        let primera = this.state.primera;
        let segunda = this.state.segunda;
        let tercera = this.state.tercera;
        let link = this.state.link;
        primera = (primera == 0) ? this.state.imgs.length - 1 : primera - 1;
        segunda = (segunda == 0) ? this.state.imgs.length - 1 : segunda - 1;
        tercera = (tercera == 0) ? this.state.imgs.length - 1 : tercera - 1;
        link = (link <= 1) ? this.state.imgs.length : link - 1;

        this.setState({
            primera: primera,
            segunda: segunda,
            tercera: tercera,
            link: link
        });
        let center = document.querySelector(".centro");
        let right = document.querySelector(".right");
        let left = document.querySelector(".left");
        left.classList.remove("left");
        left.classList.add("right");
        right.classList.remove("right");
        right.classList.add("centro");
        center.classList.remove("centro");
        center.classList.add("left");
        center.childNodes[0].style.background = `url(../../${this.state.imgs[tercera]}) `;
        right.childNodes[0].style.background = `url(../../${this.state.imgs[segunda]}) `;
        left.childNodes[0].style.background = `url(../../${this.state.imgs[primera]}) `;
        center.childNodes[1].childNodes[0].innerText = this.state.names[tercera];
        center.childNodes[1].childNodes[1].innerText = this.state.gustos[tercera];
    }
    render() {
        return (
            <div className="carousel center center-column">
                <div className="center cover">
                <div className="center-button grande">
                    <button  className="flechitas" onClick={this.moveLeft}>
                        <svg id="ic_arrow_forward_24px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path id="Trazado_3" data-name="Trazado 3" d="M12,4l1.41,1.41L7.83,11H20v2H7.83l5.58,5.59L12,20,4,12Z" transform="translate(-4 -4)" fill="#e2eaf0" />
                        </svg>
                    </button>
                </div>
                <div className="center-img">
                    <div id="right" className="img-card right"  >
                        <div className="darkfilter" ref={this.card3}></div>
                        <div className="text-box">
                            <h2></h2>
                            <p className="card text "></p>
                            <button value="" onClick={this.ref} className="links" >CONTACTAR></button>
                        </div>
                    </div>
                    <div id="center" className="img-card centro" >
                        <div className="darkfilter" ref={this.card2}></div>
                        <div className="text-box">
                            <h2></h2>
                            <p className="card text "></p>
                            <button value="" onClick={this.ref} className="links" >CONTACTAR></button>
                        </div>
                    </div>
                    <div id="left" className="img-card left" >
                        <div className="darkfilter" ref={this.card1}></div>
                        <div className="text-box">
                            <h2></h2>
                            <p className="card text "></p>
                            <button value="" onClick={this.ref} className="links" >CONTACTAR></button>
                        </div>
                    </div>
                </div>
                <div className="center-button grande">
                     <button  className="flechitas" onClick={this.moveRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <g id="ic_arrow_forward_24px" transform="translate(-4 -4)">
                                <path id="Trazado_3" data-name="Trazado 3" d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" fill="#e2eaf0" />
                            </g>
                        </svg>
                    </button>
                </div>
                </div>
                    <div className="center-button">
                    <button  className="flechitas celular" onClick={this.moveLeft}>
                        <svg id="ic_arrow_forward_24px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path id="Trazado_3" data-name="Trazado 3" d="M12,4l1.41,1.41L7.83,11H20v2H7.83l5.58,5.59L12,20,4,12Z" transform="translate(-4 -4)" fill="#e2eaf0" />
                        </svg>
                    </button>
                     <button  className="flechitas celular" onClick={this.moveRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <g id="ic_arrow_forward_24px" transform="translate(-4 -4)">
                                <path id="Trazado_3" data-name="Trazado 3" d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" fill="#e2eaf0" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}
export default Carousel;