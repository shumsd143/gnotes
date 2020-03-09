import axios from 'axios';
import React,{ Component } from 'react';
import './bodyoflogin.css';
import { Alert } from 'react-bootstrap';
class Loginbody extends Component{
    constructor(props){
        super(props)
        this.state={
            loginup:true,
            emptyl:false,
            emptys:false,
            wrongl:false,
            passwordsize:false,
            validemail:false,
            name:'',
            semail:'',
            suname:'',
            spass:'',
            lemail:'',
            lpass:''
        }
        //console.log(this.props.updatesign)
    }
    logger=()=>{
        this.setState({
            loginup:true,
            emptyl:false,
            emptys:false,
            wrongl:false,
            passwordsize:false,
            validemail:false,
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
            emptyl:false,
            emptys:false,
            wrongl:false,
            passwordsize:false,
            validemail:false,
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
            emptyl:false,
            emptys:false,
            wrongl:false,
            passwordsize:false,
            validemail:false,
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
            emptyl:false,
            emptys:false,
            wrongl:false,
            passwordsize:false,
            validemail:false,
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
            emptyl:false,
            emptys:false,
            wrongl:false,
            passwordsize:false,
            validemail:false,
            name:'',
            semail:this.state.semail,
            suname:event.target.value,
            spass:this.state.spass,
            lemail:this.state.lemail,
            lpass:this.state.lpass
        })
        //console.log('name',this.state.suname)
    }
    csemail=(event)=>{
        this.setState({
            loginup:false,
            emptyl:false,
            emptys:false,
            wrongl:false,
            passwordsize:false,
            validemail:false,
            name:'',
            semail:event.target.value,
            suname:this.state.suname,
            spass:this.state.spass,
            lemail:this.state.lemail,
            lpass:this.state.lpass
        })
        //console.log('email',this.state.semail)
    }
    cspassword=(event)=>{
        this.setState({
            loginup:false,
            emptyl:false,
            emptys:false,
            wrongl:false,
            passwordsize:false,
            validemail:false,
            name:'',
            semail:this.state.semail,
            suname:this.state.suname,
            spass:event.target.value,
            lemail:this.state.lemail,
            lpass:this.state.lpass
        })
        //console.log('pass',this.state.spass)
    }
    registerer=(event)=>{
        if(this.state.semail=='' || this.state.spass=='' || this.state.suname==''){
            event.preventDefault()
            this.setState({
                loginup:false,
                emptyl:false,
                emptys:true,
                wrongl:false,
                passwordsize:false,
                validemail:false,
                name:'',
                semail:this.state.semail,
                suname:this.state.suname,
                spass:this.state.spass,
                lemail:this.state.lemail,
                lpass:this.state.lpass
            })
            return
        }
        var checkpass=this.state.spass
        if(checkpass.length<8){
            this.setState({
                loginup:false,
                emptyl:false,
                emptys:false,
                wrongl:false,
                passwordsize:true,
                validemail:false,
                name:'',
                semail:this.state.semail,
                suname:this.state.suname,
                spass:this.state.spass,
                lemail:this.state.lemail,
                lpass:this.state.lpass
            })
            event.preventDefault()
            return
        }
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(this.state.semail) == false)
        {
            this.setState({
                loginup:false,
                emptyl:false,
                emptys:false,
                wrongl:false,
                passwordsize:false,
                validemail:true,
                name:'',
                semail:this.state.semail,
                suname:this.state.suname,
                spass:this.state.spass,
                lemail:this.state.lemail,
                lpass:this.state.lpass
            })
            event.preventDefault()
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
                emptyl:false,
                emptys:false,
                wrongl:false,
                passwordsize:false,
                validemail:false,
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
            this.setState({
                loginup:this.state.loginup,
                emptyl:true,
                emptys:false,
                wrongl:false,
                passwordsize:false,
                validemail:false,
                name:'',
                semail:this.state.semail,
                suname:this.state.suname,
                spass:this.state.spass,
                lemail:this.state.lemail,
                lpass:this.state.lpass
            })
            event.preventDefault()
            return
        }
        event.preventDefault()
        fetch('https://apinotessh.herokuapp.com/student/loginget/'+this.state.lemail)
        .then(res=>res.json())
        .then(json=>{
            var arr=json.data
            //console.log(json.data.length)
            if(json.data.length){
                var outpass=arr[0].password
                if(outpass==this.state.lpass){
                    //event.preventDefault()
                    this.props.updatesign(arr[0].username)
                    localStorage.setItem('filesharinguser',arr[0].username)
                    localStorage.setItem('filesharingemail',this.state.lemail)
                }
                else{
                    this.setState({
                        loginup:this.state.loginup,
                        emptyl:false,
                        emptys:false,
                        wrongl:true,
                        passwordsize:false,
                        validemail:false,
                        name:'',
                        semail:this.state.semail,
                        suname:this.state.suname,
                        spass:this.state.spass,
                        lemail:this.state.lemail,
                        lpass:this.state.lpass
                    })
                    //event.preventDefault()
                }
            }
            else{
                this.setState({
                    loginup:this.state.loginup,
                    emptyl:false,
                    emptys:false,
                    wrongl:true,
                    passwordsize:false,
                    validemail:false,
                    name:'',
                    semail:this.state.semail,
                    suname:this.state.suname,
                    spass:this.state.spass,
                    lemail:this.state.lemail,
                    lpass:this.state.lpass
                })
            }
        })
            
    }
    render(){
        var {semail,suname,spass,lemail,lpass,loginup,emptyl,wrongl,emptys,passwordsize,validemail}=this.state
        //console.log(loginup)
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
                        <Alert variant={"danger"} show={wrongl}>Wrong Email-id or Password</Alert>
                        <Alert variant={"danger"} show={emptyl}>Email-id or Password cannot be empty</Alert>
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
                        <Alert variant={"danger"} show={emptys}>Name , E-mail or Password cannot be empty</Alert>
                        <Alert variant={"danger"} show={passwordsize}>Password should contain atleast 8 characters</Alert>
                        <Alert variant={"danger"} show={validemail}>Please enter valid e-mail</Alert>
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
                            <button className="button" onClick={this.registerer}>Register</button><br/>
                        </form>
                        </div>
                    </div>
                </div>
            )
        }    
    }
}

export default Loginbody