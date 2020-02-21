import React,{ Component } from 'react';
import Allfile from './allfile'
import Endbar from './endbar'
import Uploader from './uploader';
import Forum from './forum';
import Loginbody from './loginbody';
import {  Modal, ModalBody } from 'reactstrap';
import './bodyallfile.css';

import {Navbar,Nav} from 'react-bootstrap';

class Navbarer extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'User',
            signvalue:'Signup',
            signup:false,
            home:true,
            upload:false,
            question:false
        }
    }
    homechange=()=>{
        this.setState({
            name:this.state.name,
            signvalue:this.state.signvalue,
            signup:false,
            home:true,
            upload:false,
            question:false
        })
    }
    uploadchange=()=>{
        if(this.state.signvalue=='Signup'){
            alert('please sign in to upload')
            this.setState({
                signup:true,
                signvalue:this.state.signvalue,
                name:this.state.name,
                home:false,
                upload:true,
                question:false
            })
            return
        }
        this.setState({
            signup:false,
            signvalue:this.state.signvalue,
            name:this.state.name,
            home:false,
            upload:true,
            question:false
        })
    }
    questionchange=()=>{
        if(this.state.signvalue=='Signup'){
            alert('Please sign in to Access QnA Thread')
            this.setState({
                signup:true,
                signvalue:this.state.signvalue,
                name:this.state.name,
                home:false,
                upload:false,
                question:true
            })
            return
        }
        this.setState({
            signup:false,
            signvalue:this.state.signvalue,
            name:this.state.name,
            home:false,
            upload:false,
            question:true
        })
    }
    clicksign=()=>{
        if(this.state.signvalue=='Signout'){
            var c=window.confirm('Are you sure you want to log out')
            if(c==true){
                this.setState({
                    signup:false,
                    signvalue:'Signup',
                    name:'User',
                    home:this.state.home,
                    upload:this.state.upload,
                    question:this.state.question
                })
                return
            }
            else{
                this.setState({
                    signup:false,
                    signvalue:this.state.signvalue,
                    name:this.state.name,
                    home:this.state.home,
                    upload:this.state.upload,
                    question:this.state.question
                })
                return
            }
        }
        this.setState({
            signup:true,
            signvalue:this.state.signvalue,
            name:this.state.name,
            home:this.state.home,
            upload:this.state.upload,
            question:this.state.question
        })
    }
    toggle=()=>{
        this.setState({
            signup:false,
            signvalue:this.state.signvalue,
            name:this.state.name,
            home:this.state.home,
            upload:this.state.upload,
            question:this.state.question
        })
    }
    loginnamefun=(namelog)=>{
        this.setState({
            signup:false,
            signvalue:'Signout',
            name:namelog,
            home:this.state.home,
            upload:this.state.upload,
            question:this.state.question
        })
    }

    render(){
        var {home,upload,question,signup,signvalue,name}=this.state
        if(question==true && signvalue=='Signout'){
            return (
                <div>
                    <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand href="#" onClick={this.homechange}>Files Sharing Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.homechange}>Home</Nav.Link>
                            <Nav.Link href="" onClick={this.uploadchange}>My Uploads</Nav.Link>
                            <Nav.Link href="" onClick={this.questionchange}>QnA Threads</Nav.Link>
                        </Nav>
                        Hi, {name}
                        <Nav.Link href="" onClick={this.clicksign} activate={signup}>{signvalue}</Nav.Link>
                    </Navbar.Collapse>
                    </Navbar>
                    <Forum/>
                </div>
            )
        }
        else if(upload==true && signvalue=='Signout'){
            return (
                <div>
                    <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand href="#" onClick={this.homechange}>Files Sharing Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.homechange}>Home</Nav.Link>
                            <Nav.Link href="" onClick={this.uploadchange}>My Uploads</Nav.Link>
                            <Nav.Link href="" onClick={this.questionchange}>QnA Threads</Nav.Link>
                        </Nav>
                        Hi, {name}
                        <Nav.Link href="" onClick={this.clicksign} activate={signup}>{signvalue}</Nav.Link>
                    </Navbar.Collapse>
                    </Navbar>
                    <Uploader owner={name} aller={this.props.propers}/>
                </div>
            )
        }
        else{
            const externalCloseBtn = <button className="close" style={{ position: 'absolute' }} onClick={this.toggle}>&times;</button>;
            return (
                <div>
                    <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand href="#" onClick={this.homechange}>Files Sharing Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.homechange}>Home</Nav.Link>
                            <Nav.Link href="" onClick={this.uploadchange}>My Uploads</Nav.Link>
                            <Nav.Link href="" onClick={this.questionchange}>QnA Threads</Nav.Link>
                        </Nav>
                        Hi, {name}
                        <Nav.Link href="" onClick={this.clicksign} activate={signup}>{signvalue}</Nav.Link>
                        <Modal className="bodyblowmodal" isOpen={signup} toggle={this.toggle} external={externalCloseBtn}>
                        <ModalBody className="modalbackground">  
                        <Loginbody updatesign={(loginname)=>this.loginnamefun(loginname)} />
                        </ModalBody>
                        </Modal>
                    </Navbar.Collapse>
                    </Navbar>
                    <div className="headerchange">
                        <h className="heading"><center>Search and Store files easily</center></h>    
                    </div>
                    <Allfile propers={this.props.propers} nextstage={this.props.nexter}/>
                    <Endbar/>
                </div>
            )
        }

    }
}


export default Navbarer