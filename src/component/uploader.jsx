import axios from 'axios'
import React,{ Component } from 'react';
import {Badge} from 'react-bootstrap';
import './bodyallfile.css';
import Myfile from './Myfile'
import {Form,FormGroup,Label,CustomInput,Button,Spinner} from 'reactstrap'
class Uploader extends Component{
    constructor(props){
        super(props)
        this.state={
            activate:false,
            urlvalue:'',
            clicker:false
        }
    }
    onurlchange=(event)=>{
        var vh=event.target.files
        console.log(vh[0].name)
        this.setState({
            activate:this.state.activate,
            urlvalue:vh[0],
            clicker:this.state.clicker
        })
    }
    clickchange=()=>{
        //console.log(this.state.urlvalue)
        if(this.state.urlvalue==''){
            alert('enter the file')
            return
        }
        const data= new FormData();
        this.setState({
            activate:true,
            urlvalue:this.state.urlvalue,
            clicker:true
        })
        var postervalue={
            'name':this.props.owner,
            'filename':this.state.urlvalue.name,
            'profilepic':false
        }
        data.append('file',this.state.urlvalue)
        axios.post('https://apinotessh.herokuapp.com/upload',data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(res=>{
            axios.post('http://localhost:5000/personalfile/posting',postervalue).then(res=>{
                this.setState({
                    activate:false,
                    urlvalue:'',
                    clicker:false
                })
            })  
        })
        /* this.interval=setInterval(()=>{this.fetcher()},10000) */
    }

    render(){
        var {activate,urlvalue,clicker}=this.state
        console.log(activate)
        if(activate==true){
            return (
                <div className="head">
                    <h1>
                        <center><Badge variant="secondary">Upload your File</Badge></center>
                    </h1>
                    <div>
                        <Form className="manageform">
                            <FormGroup>
                                <Label for="exampleCustomFileBrowser">Enter File Directory</Label>
                                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
                                <div className="spinni">
                                    <Spinner type="grow" color="primary" />
                                    <Spinner type="grow" color="secondary" />
                                    <Spinner type="grow" color="success" />
                                    <Spinner type="grow" color="danger" />
                                    <Spinner type="grow" color="warning" />
                                    <Spinner type="grow" color="info" />
                                    <Spinner type="grow" color="dark" />Uploading Please Wait....
                                </div>
                                <Button color="primary" size="lg"className="buttonchange" block>Upload</Button>
                            </FormGroup>
                            <Myfile finalname={this.props.owner}/>
                        </Form>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="head">
                    <h1>
                        <center><Badge variant="secondary">Upload your File</Badge></center>
                    </h1>
                    <div>
                        <Form className="manageform">
                            <FormGroup>
                                <Label for="exampleCustomFileBrowser">Enter File Directory</Label>
                                <CustomInput type="file" id="exampleCustomFileBrowser" onChange={this.onurlchange} name="customFile" />
                                <Button color="primary" size="lg"className="buttonchange" onClick={this.clickchange} block>Upload</Button>
                            </FormGroup>
                            <br/>
                            <Myfile finalname={this.props.owner}/>
                        </Form>
                    </div>
                </div>
            )
        }    
    }
}


export default Uploader