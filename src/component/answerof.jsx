import React,{ Component } from 'react';
import Answercard from './answercard'
import {Form,InputGroup,Input,Spinner} from 'reactstrap'
import {Alert} from 'react-bootstrap'
import './bodyallfile.css';

class Answerof extends Component{
    constructor(props){
        super(props)
        this.state={
            urlvalue:'',
            afterurl:[],
            items:[],
            load:false,
          }
    }
    fetcher=()=>{
        fetch('https://apinotessh.herokuapp.com/comment')
        .then(res=>res.json())
        .then(json=>{
          var arr=json.data
          this.setState({
            urlvalue:this.state.urlvalue,
            afterurl:this.state.afterurl,
            load:true,
            items:arr
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
    inputofanswer=(event)=>{
      let val=event.target.value.toLowerCase()
      let questionarray=this.state.items
      let shownarray=[]
      questionarray.map((value)=>{
        let question=value.question.toLowerCase()
        let check=question.includes(val)
        if(check==true){
          shownarray.push(value)
        }
      })
      this.setState({
        urlvalue:event.target.value,
        afterurl:shownarray,
        load:true,
        items:this.state.items
      })
    }
    render(){
        var {load,items,urlvalue,afterurl}=this.state
        //console.log(items)
        if(load==true){
          if(urlvalue==''){
            return (
              <div>
                <div>
                  <Form className="questionfindform">
                  <InputGroup size="lg" className="Adjustinput">
                    <Input placeholder="Enter the keyword to be searched ..." value={urlvalue} onChange={this.inputofanswer}/>
                  </InputGroup>
                  </Form>
                </div>
                {items.map(data=>
                  <Answercard orgvalue={data} id={data.question}/>
                )}
              </div>
            )
          }
          else{
            if(afterurl.length==0){
              return (
                <div>
                  <div>
                    <Form className="questionfindform">
                    <InputGroup size="lg" className="Adjustinput">
                      <Input placeholder="Enter the keyword" value={urlvalue} onChange={this.inputofanswer}/>
                    </InputGroup>
                    </Form>
                  </div>
                  <Alert variant='danger'>
                    No Related Questions are posted please post it
                  </Alert>
                </div>
              )
            }
            else{
              return (
                <div>
                  <div>
                    <Form className="questionfindform">
                    <InputGroup size="lg" className="Adjustinput">
                      <Input placeholder="Enter the keyword" value={urlvalue} onChange={this.inputofanswer}/>
                    </InputGroup>
                    </Form>
                  </div>
                  {afterurl.map(data=>
                    <Answercard orgvalue={data} id={data.question}/>
                  )}
                </div>
              )
            }
          }
        }
        else{
          return (
              <div>
                  <center>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
                    <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
                  </center>
              </div>
          )
        }    
    }
}


export default Answerof