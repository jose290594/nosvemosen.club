import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import {Menu} from "../menu/menu"
import './principal.css';
class Inicio extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu/>
        );
    }
}
export default inicio;