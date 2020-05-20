import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './footer.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center center-column cover footer">
                <div className="center contenido">
                    <div className="footer-logo">
                        <div className="logo">
                        </div>
                    </div>
                    <div className=" center center-column contact">
                        <h2>CONTACTANOS</h2>
                        <Link to="">AYUDA</Link>
                        <Link to="">PAGOS</Link>
                        <Link to="">SUGERENCIAS</Link>
                        <p>+1 800 123 1234</p>
                        <p>email@website.com</p>
                    </div>
                </div>
                <div className="center politica">
                    <p>@Copyright 2019.All Right Reserved</p><p>Privacy Policy Terms & Conditions</p>
                </div>
            </div>
        );
    }
}
export default Footer;

