import React,{ Component } from 'react';
import './bodyallfile.css';
class Tableview extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.owned)
        var data=props.filer
        var filename=data.filename
        var modifiedfilename=filename.split('.')
        var contentType=data.contentType
        var modifiedcontentType=contentType.split('/')
        var uploaddate=data.uploadDate
        var modifieduploaddate=uploaddate.split('T')
        var size=Math.round(data.length/1024)
        var modifiedsize=''
        if(size<513){
            modifiedsize=size.toString()+' KB'
        }
        else{
            size=Math.round(size/1024)
            modifiedsize=size.toString()+' MB'
        }
        var iteration=this.props.owned
        var owner=''
        iteration.map(newdata=>{
            if(newdata.filename==filename){
                owner=newdata.name
            }
        })
        this.state={
            name:modifiedfilename[0],
            date:modifieduploaddate[0],
            Uploadedby:owner,
            size:modifiedsize,
            content:modifiedcontentType[1],
            link:'https://apinotessh.herokuapp.com/files/'+data.filename
        }
    }
    render(){
        var {name,date,Uploadedby,size,content,link}=this.state
        return (
            <tr>
                <th scope="row"></th>
                <td><a className="tabular" href={link}>{name}</a></td>
                <td>{date}</td>
                <td>{Uploadedby}</td>
                <td>{size}</td>
                <td>{content}</td>
            </tr>
        )
    }
}

export default Tableview