import React,{ Component } from 'react';
import {Navbar,Form,FormControl,Button,Nav,Alert,Table} from 'react-bootstrap'
import Tableview from './Tableview'
import './bodyallfile.css';
class Allfile extends React.Component{
    constructor(props){
        super(props)
        var n=this.props.propers
        n.sort(function(a,b){

            if(a<b){
                return -1
            }
            else{
                return 1
            }
            return 0
        })
        this.state={
            valurl:'',
            finalitem:n,
            sortitems:n
        }
    }
    changer=(event)=>{
        var s=event.target.value
        var arr=this.state.finalitem
        var s2=[]
        if(s.length>0){
        arr.map(data=>{
            var str=data.filename
            var size=s.length
            if(str.slice(0,size).toUpperCase()===s.toUpperCase()){
                s2.push(data)
            }
        })}
        else{
            s2=arr
        }
        var final=s2
        this.setState({
            valurl:s,
            finalitem:this.state.finalitem,
            sortitems:final
        })
    }
    render(){
        var {valurl,sortitems}=this.state
        console.log(sortitems)
        if(sortitems.length==0){
            return (
                <div>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand>All Files</Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>
                        <Form inline>
                        <FormControl type="text" placeholder="Search for Files" value={valurl} className="mr-sm-2" onChange={this.changer}/>
                        </Form>
                    </Navbar><br/>
                    <Alert variant='danger'>
                        No Related Files to show
                    </Alert>
                </div>
            )
        }
        else{
            return (
                <div>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand>All Files</Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search for Files" value={valurl} className="mr-sm-2" onChange={this.changer}/>
                        </Form>
                    </Navbar><br/>
                    <div className="tabular">
                    <Table striped>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date Modified</th>
                            <th>Uploaded by</th>
                            <th>Size</th>
                            <th>ContentType</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortitems.map(data=>
                                <Tableview filer={data} key={data._id} owned={this.props.nextstage}/>
                            )}
                        </tbody>
                    </Table>
                    </div><br/>
                </div>
            )
        }
    }
}

export default Allfile