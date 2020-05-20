import React, { Component } from 'react';
import './alert-Box.scss';
const show = "content show";
const hide = "content hide";
class Alert extends Component {
    constructor(props) {
        super(props);
        this.state ={
            show :false
        }
        this.wrapper = React.createRef();
    }
componentDidMount(){
    console.log(this.state)
}
hide=()=>{
   
}
    render() {
        return (
           <div className={this.props.class} onClick={this.hide} ref={this.wrapper} >
              <div className="alert-box">
                  {this.props.mensaje}
              </div>
           </div>
        );
    }
}
export default Alert;

