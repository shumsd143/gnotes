import { Spinner } from 'reactstrap';
import React,{ Component } from 'react';
import './App.css';
import Navbar from './component/navbar'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
        urlload:false,
        uploadfiler:[],
        allitem:[]
    }
  }
  fetcher=()=>{
      fetch('https://apinotessh.herokuapp.com/allfileinfo')
      .then(res=>res.json())
      .then(json=>{
      
          var arr=json.files
          var arr4=[];
          arr.map(data=>{
              var s=data.filename
              arr4.push(data)
          })
          fetch('https://apinotessh.herokuapp.com/personalfile/getting').then(res=>res.json()).then(json=>{
            var iterator=json.data
            var arr=[]
            iterator.map(data=>{
                arr.push(data)
            })
            this.setState({
              urlload:true,
              uploadfiler:arr,
              allitem:arr4
            })
          })
      })
  }
  componentDidMount(){
      this.fetcher();
      this.interval=setInterval(()=>{this.fetcher()},2000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render(){
    var { urlload,allitem,uploadfiler }=this.state;
    if(urlload==false){
      return (
        <div><center><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        </center>
        </div>
      );}
    else{
    return (
      <div>
        <Navbar propers={allitem} nexter={uploadfiler}/>
      </div>
    );}
  }
}

export default App;