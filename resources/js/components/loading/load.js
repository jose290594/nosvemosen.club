import React, { Component } from 'react';
import './load.scss';
class Load extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className={`center ${this.props.load} load`}>
            <div className={``}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            </div>
        );
    }
}
export default Load;