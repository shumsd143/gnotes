import React,{ Component } from 'react';
import {
    Card,Nav
  } from 'react-bootstrap';
import './bodyallfile.css';
class Imagebody extends Component{
    constructor(props){
        super(props)
        //console.log(props.encod)
        this.state={
            url:'https://apinotessh.herokuapp.com/files/'+props.filer,
            title:props.filer
        }
    }
    render(){
        var {url,title}=this.state
        //console.log(url,title)
        return (
            <Card bg="dark" text="white" style={{ 'min-width': '20rem','margin':'25px' }} className="filecompo">
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                <Card.Title>
                <Nav.Link href={url} target="_blank">
                    View file
                </Nav.Link></Card.Title>
                </Card.Body>
            </Card>
        )
    }
}


export default Imagebody