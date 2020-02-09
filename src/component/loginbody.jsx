import axios from 'axios';
import React,{ Component } from 'react';
import './bodyoflogin.css';
class Loginbody extends Component{
    constructor(props){
        super(props)
        this.state={
            loginup:true,
            name:'',
            semail:'',
            suname:'',
            spass:'',
            lemail:'',
            lpass:''
        }
        console.log(this.props.updatesign)
    }
    logger=()=>{
        this.setState({
            loginup:true,
            name:'',   
            semail:this.state.semail,
            suname:this.state.suname,
            spass:this.state.spass,
            lemail:this.state.lemail,
            lpass:this.state.lpass
        })
    }
    signer=()=>{
        this.setState({
            loginup:false,
            name:'',
            semail:this.state.semail,
            suname:this.state.suname,
            spass:this.state.spass,
            lemail:this.state.lemail,
            lpass:this.state.lpass
        })
    }
    clemail=(event)=>{
        //console.log(event.target.value)
        this.setState({
            loginup:true,
            name:'',
            semail:this.state.semail,
            suname:this.state.suname,
            spass:this.state.spass,
            lemail:event.target.value,
            lpass:this.state.lpass
        })
    }
    clpass=(event)=>{
        this.setState({
            loginup:true,
            name:'',
            semail:this.state.semail,
            suname:this.state.suname,
            spass:this.state.spass,
            lemail:this.state.lemail,
            lpass:event.target.value
        })
    }
    csname=(event)=>{
        this.setState({
            loginup:false,
            name:'',
            semail:this.state.semail,
            suname:event.target.value,
            spass:this.state.spass,
            lemail:this.state.lemail,
            lpass:this.state.lpass
        })
    }
    csemail=(event)=>{
        this.setState({
            loginup:false,
            name:'',
            semail:event.target.value,
            suname:this.state.suname,
            spass:this.state.spass,
            lemail:this.state.lemail,
            lpass:this.state.lpass
        })
    }
    cspassword=(event)=>{
        this.setState({
            loginup:false,
            name:'',
            semail:this.state.semail,
            suname:this.state.suname,
            spass:event.target.value,
            lemail:this.state.lemail,
            lpass:this.state.lpass
        })
    }
    registerer=()=>{
        if(this.state.semail=='' || this.state.spass=='' || this.state.name==''){
            alert('Email, Name or password cannot be empty')
            return
        }
        var data={
            'username':this.state.suname,
            'password':this.state.spass,
            'email':this.state.semail
        }
        axios.post('https://apinotessh.herokuapp.com/student/loginpost',data).then(res=>{
            this.setState({
                loginup:true,
                name:'',
                semail:'',
                suname:'',
                spass:'',
                lemail:this.state.lemail,
                lpass:this.state.lpass
            })
        })
    }
    loginer=(event)=>{
        if(this.state.lemail=='' || this.state.lpass==''){
            alert('email or password cannot be empty')
            event.preventDefault()
            return
        }
        event.preventDefault()
        fetch('https://apinotessh.herokuapp.com/student/loginget/'+this.state.lemail)
        .then(res=>res.json())
        .then(json=>{
            var arr=json.data
            console.log(json.data.length)
            if(json.data.length){
                var outpass=arr[0].password
                if(outpass==this.state.lpass){
                    //event.preventDefault()
                    this.props.updatesign(arr[0].username)
                }
                else{
                    alert('Wrong password')
                    //event.preventDefault()
                }
            }
            else{
                alert('Wrong e-mail')
            }
        })
            
    }
    render(){
        var {semail,suname,spass,lemail,lpass,loginup}=this.state
        console.log(loginup)
        if(loginup==true){
            return (
                <div className="align">
                    <div className="newcard">
                        <div className="header">
                            <div></div>
                            <a id="login" className="selected"  href="#login">Login</a>
                            <a id="register" href="#register" onClick={this.signer}>Register</a>
                            <div></div>
                        </div>
                        <div className="tabs">
                        <form className="form">
                            <div className="inputs">
                                <div className="input">
                                    <input placeholder="Email-id" value={lemail} type="text" onChange={this.clemail}/>
                                </div>
                                <div className="input">
                                    <input placeholder="Password" value={lpass} type="password" onChange={this.clpass}/>
                                </div>
                            </div>
                            <button className="button" onClick={this.loginer}>Login</button>
                        </form>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="align">
                    <div className="newcard">
                        <div className="header">
                            <div></div>
                            <a id="login" onClick={this.logger}  href="#">Login</a>
                            <a id="register" className="selected" href="#">Register</a>
                            <div></div>
                        </div>
                        <div className="tabs">
                        <form className="form">
                            <div className="inputs">
                                <div className="input">
                                    <input placeholder="Username" value={suname} type="text" onChange={this.csname}/>
                                </div>
                                <div className="input">
                                    <input placeholder="E-mail" value={semail} type="e-mail" onChange={this.csemail}/>
                                </div>
                                <div className="input">
                                    <input placeholder="Password" value={spass} type="password" onChange={this.cspassword}/>
                                </div>
                            </div>
                            <button className="button" onClick={this.registerer}>Register</button>
                        </form>
                        </div>
                    </div>
                </div>
            )
        }    
    }
}

export default Loginbody