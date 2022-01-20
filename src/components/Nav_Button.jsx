import React, { Component } from 'react'
import './Nav_Button.css'

export default class Nav_Button extends Component {
  
  constructor(props) {
    super(props);
    this.OnClick = this.OnClick.bind(this);
    this.state = {
      button_active: false
    };
  }

  OnClick() {
    if(this.state.button_active === false) {
      this.setState({
        button_active:true
      });
    } else {
      this.setState(
        {
          button_active:false
        }
      )
    }
    console.log('Button clicked');
  }
  
  render() {
    return (
      <div className={this.state.button_active?'button-container active':'button-container'} onClick={this.OnClick}>
        <a href="#">
          <h4>{this.props.button_name}</h4>
        </a>
      </div>
    )
  }
}
