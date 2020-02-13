import Imagebody from './imagebody'
import React,{ Component } from 'react';
import {Alert,Form,Button,Badge,FormControl,Navbar,Nav} from 'react-bootstrap'
import { Breadcrumb, BreadcrumbItem,Spinner } from 'reactstrap';
import './bodyallfile.css';
class Myfile extends Component{
    constructor(props){
        super(props)
        this.state={
            fileloaded:false,
            item:[]
        }
        console.log(this.props.finalname)
    }
    fetcher=()=>{
        fetch('https://apinotessh.herokuapp.com/personalfile/getting')
        .then(res=>res.json())
        .then(json=>{
            var iterator=json.data
            var arr=[]
            iterator.map(data=>{
                if(data.name==this.props.finalname){
                    arr.push(data.filename)
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
    }
    render(){
        var {fileloaded,item}=this.state
        console.log(item)
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
                        No Files to show
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
                    <div className="adjustfile">
                        {item.map(seconddata=>
                            <Imagebody filer={seconddata} />
                        )}
                    </div><br/>
                </div>
            )
        }
    }
}


export default Myfile