import React,{ Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'react-bootstrap';

class Endbar extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Navbar sticky="bottom">
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    Created and Maintained By <a>Shubham Shekhar</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )    
    }
}


export default Endbar