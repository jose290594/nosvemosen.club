import React, { Component } from 'react';
import './imgbox.scss';
import Load from './../loading/load';
class ImgBox extends Component {
    constructor(props) {
        super(props);
        this.cajita = React.createRef();
        this.state = {
            load: 'notload',
            img: false,
        }
    }
    componentDidMount() {
        this.setState({ load: 'onload' });
        let ruta = `../../${this.props.img}`;
        this.preload(ruta)
    }
    componentDidUpdate() {
        this.cajita.current.classList.toggle('rotate');
    }
    preload = (data) => {
        return new Promise((done) => {
            try {
                let check = () => {
                //    console.log('recivido');
                    this.setState({ load: 'notload', img: true });
                }
                let load = (url) => {
                    let req = new XMLHttpRequest();
                    req.open('GET', url, true);
                    req.responseType = 'blob',
                        req.onload = () => check();
                    req.onerror = () => check();
                    req.send();
                }
                load(data);
            } catch (error) {
                console.log('error :', error)
            }
        })
    }
    render() {
        const girar = 'girar';
        const Fondo = () => {
            return (
                <div className={`cuadritoimg `} style={{ background: `url(../../${this.props.img}) ` }}>
                </div>
            )
        }
        const Descripcion = () => {
            return (
                    <div className="tiny-text">
                        <h2> {this.props.nombre}</h2>
                        <p >{this.props.gusto}</p>
                        <button value={`${this.props.user}`} onClick={this.props.referir} className="links" >CONTACTAR></button>
                    </div>
                   
            )
        }
        const Localizacion = ()=>{
            return (
                    <div className={"ubicacion"}>
                        <p>{this.props.ciudad},{this.props.provincia}, {this.props.edad} años</p>
                    </div> 
            )
        }
        return (
            <div className={`center ${this.props.class}`} ref={this.cajita}>
                <Load load={`${this.state.load} padding`} />
                {(this.state.img) ? <Fondo /> : <p></p>}
                {this.props.ciudad ? <Descripcion/>:<p></p>}
                {this.props.ciudad ?<Localizacion/>:<p></p>}
            </div>
        );
    }
}
export default ImgBox;