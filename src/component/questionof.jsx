import axios from 'axios';
import React,{ Component } from 'react';
import {Form,Button,Badge} from 'react-bootstrap'
import { Breadcrumb,Alert, BreadcrumbItem,Spinner } from 'reactstrap';
import './bodyallfile.css';
class Questionof extends Component{
    constructor(props){
        super(props)
        this.state={
            items:[],
            load:false,
            onquestion:'',
          }
    }
    onposter=()=>{
        var str=this.state.onquestion
        if(str==''){
            alert('please enter the question')
            return
        }
        var data={'question':str}
        axios.post('https://apinotessh.herokuapp.com/comment/post',data).then(res=>{
            this.setState({
                items:this.state.items,
                load:this.state.load,
                onquestion:''
            })
        })
    }
    changer=(event)=>{
        var s=event.target.value
        this.setState({
            load:this.state.load,
            items:this.state.items,
            onquestion:s
        })
    }
    fetcher=()=>{
        fetch('https://apinotessh.herokuapp.com/comment')
        .then(res=>res.json())
        .then(json=>{
          var arr=json.data
          this.setState({
            load:true,
            items:arr,
            onquestion:this.state.onquestion
          })
        })
      }
      componentDidMount(){
        this.fetcher();
        this.interval=setInterval(()=>{this.fetcher()},1000)
      }
      componentWillUnmount() {
        clearInterval(this.interval);
    }
    render(){
        var {load,items,onquestion}=this.state
        console.log(onquestion)
        if(load==true){
            return (
                <div className="addedinput">
                    <Form.Control size="lg" type="text" onChange={this.changer} value={onquestion} placeholder="Type your question" />
                    <div className="questbut">
                    <Button onClick={this.onposter} variant="dark" size="lg" block>
                        Post your question
                    </Button></div>
                    <div className="bread">
                        <center><h1>
                            <Badge variant="primary">Already Posted Question</Badge></h1>
                        </center>
                    </div>
                    {items.map(data=>
                        <Alert color="secondary">
                            {data.question}
                        </Alert>
                    )}
                </div>
            )
        }
        else{
            return (
                <div className="addedinput">
                    <Form.Control size="lg" type="text" onChange={this.changer} value={onquestion} placeholder="Type your question" />
                    <div className="questbut">
                    <Button variant="dark" size="lg" onClick={this.onposter} block>
                    Post your question
                    </Button></div>
                    <div className="bread">
                        <center><h1>
                            <Badge variant="primary">Already Posted Question</Badge></h1>
                        </center>
                    </div>
                    <center><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /></center>
                </div>
            )
        }    
    }
}


export default Questionof