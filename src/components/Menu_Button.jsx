import React, { Component } from 'react';
import './Menu_Button.css';

export default class Menu_Button extends Component {

  constructor(props) {
    super(props);
    this.ToggleMenu = this.ToggleMenu.bind(this);
    this.state = {
      menu_active:false
    };
  }

  ToggleMenu() {
    
    if (this.state.menu_active === false) {
      this.setState({
        menu_active:true
      });
    } else {
      this.setState({
        menu_active:false
      });
    }
    console.log(`ToggleMenu ${this.state.menu_active}`);
  }

  render() {
    return (
        <div className='menu-button'> 
          <li className={this.state.menu_active?'menu-btn_no_hover':'menu-btn'} onClick={this.ToggleMenu}>
            <ul className={this.state.menu_active?'menu-line menu-line-top top_active':'menu-line menu-line-top'}></ul>
            <ul className={this.state.menu_active?'menu-line menu-line-middle middle_active':'menu-line menu-line-middle'}></ul>
            <ul className={this.state.menu_active?'menu-line menu-line-bottom bottom_active':'menu-line menu-line-bottom'}></ul>
          </li>
        </div>
    )
  }
}
