import Myfilebody from './Myfilebody'
import React,{ Component } from 'react';
import {Alert,Form,Button,Badge,FormControl,Navbar,Nav} from 'react-bootstrap'
import { Breadcrumb, BreadcrumbItem,Spinner,Table } from 'reactstrap';
import './bodyallfile.css';
class Myfile extends Component{
    constructor(props){
        super(props)
        this.state={
            fileloaded:false,
            item:[]
        }
        //console.log(this.props.allfileavail)
    }
    fetcher=()=>{
        fetch('https://apinotessh.herokuapp.com/personalfile/getting')
        .then(res=>res.json())
        .then(json=>{
            var iterator=json.data
            var arr=[]
            var arr1=this.props.allfileavail
            iterator.map(data=>{
                if(data.name==this.props.finalname){
                    arr1.map(originaldata=>{
                        if(originaldata.filename==data.filename){
                            arr.push(originaldata)
                        }
                    })
                }
            })
            this.setState({
                fileloaded:true,
                item:arr
            })
        })
    }
    componentDidMount(){
        this.fetcher();
        this.interval=setInterval(()=>{this.fetcher()},500)
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    render(){
        var {fileloaded,item}=this.state
        //console.log(item)
        if(fileloaded==false){
            return (
                <div>
                    <Navbar bg="success" variant="light">
                        <Navbar.Brand>My Uploads</Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>
                        {/* <Form inline>
                        <FormControl type="text" placeholder="Search for Files" className="mr-sm-2" onChange={this.changer}/>
                        <Button variant="outline-primary">Search</Button>
                        </Form> */}
                    </Navbar>
                    <br/>
                    <center>
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
                    </center>
                </div>
            )
        }
        else if(item.length==0){
            return (
                <div>
                    <Navbar bg="success" variant="light">
                        <Navbar.Brand>My Uploads</Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>
                        {/* <Form inline>
                        <FormControl type="text" placeholder="Search for Files" className="mr-sm-2" onChange={this.changer}/>
                        <Button variant="outline-primary">Search</Button>
                        </Form> */}
                    </Navbar>
                    <br/>
                    <Alert variant='danger'>
                        You Have not uploaded any files yet
                    </Alert>
                </div>
            )
        }
        else{
            return (
                <div>
                    <Navbar bg="success" variant="light">
                        <Navbar.Brand>My Uploads</Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>
                        {/* <Form inline>
                        <FormControl type="text" placeholder="Search for Files" className="mr-sm-2" onChange={this.changer}/>
                        <Button variant="outline-primary">Search</Button>
                        </Form> */}
                    </Navbar>
                    <br/>
                    <div className="tablet">
                        <Table striped>
                            <thead>
                                <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Date Modified</th>
                                <th></th>
                                <th>Size</th>
                                <th>ContentType</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.map(data=>
                                    <Myfilebody filer={data} key={data._id} />
                                )}
                            </tbody>
                        </Table>
                    </div><br/>
                </div>
            )
        }
    }
}


export default Myfile