import React from 'react';
import {NavDropdown,Alert,Table} from 'react-bootstrap'
import Bodyallfile from './Bodyallfile';
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
            dropdownvalue:'FileName',
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
            var str=''
            if(this.state.dropdownvalue=='FileName'){
                str=data.filename
            }
            else{
                var filename=data.filename
                var modifiedfilename=filename.split('.')
                var contentsize=modifiedfilename.length
                str=modifiedfilename[contentsize-1]
            }
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
            dropdownvalue:this.state.dropdownvalue,
            finalitem:this.state.finalitem,
            sortitems:final
        })
    }
    dropdownfilename=()=>{
        this.setState({
            valurl:this.state.valurl,
            dropdownvalue:'FileName',
            finalitem:this.state.finalitem,
            sortitems:this.state.sortitems
        })
    }
    dropdowncontent=()=>{
        console.log('clicked')
        this.setState({
            valurl:this.state.valurl,
            dropdownvalue:'Content-Type',
            finalitem:this.state.finalitem,
            sortitems:this.state.sortitems
        })
    }
    skippart=()=>{
        window.scrollTo(0,600);
    }
    render(){
        var {valurl,sortitems,dropdownvalue}=this.state
        //console.log(sortitems)
        if(sortitems.length==0){
            return (
                <div>
                    <div className="inputparent">
                        <input className="inputer" type="text" placeholder="  Search for files....." value={valurl} onChange={this.changer}/>
                        <NavDropdown className="inputdropdown" title={dropdownvalue} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.dropdownfilename}>FileName</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.dropdowncontent}>Content-Type</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <center><div style={{fontWeight:1000,marginBottom:'15px'}}>or</div></center>
                    <button className="recently" onClick={this.skippart}>Recent Uploads</button>
                    <div className="tablet" id="tabular">
                        <Table >
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
                        </Table>
                        <Alert variant='danger'>
                            No Related Files to show
                        </Alert>      
                    </div><br/>
                    <div className="outerrecent">
                        <br/>
                        <br/>
                        <div className="innerrecent">
                            <h1 className="recentheaders">Recently Uploaded files</h1>
                            <Bodyallfile />
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    <div className="inputparent">
                        <input className="inputer" type="text" placeholder="  Search for files....." value={valurl} onChange={this.changer}/>
                        <NavDropdown className="inputdropdown" title={dropdownvalue} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.dropdownfilename}>FileName</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.dropdowncontent}>Content-Type</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <center><div style={{fontWeight:1000,marginBottom:'15px'}}>or</div></center>
                    <button className="recently" onClick={this.skippart}>Recent Uploads</button>
                    <div className="tablet" id="tabular">
                        <Table >
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
                    <div className="outerrecent">
                        <br/>
                        <br/>
                        <div className="innerrecent">
                            <h1 className="recentheaders">Recently Uploaded files</h1>
                            <Bodyallfile />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Allfile