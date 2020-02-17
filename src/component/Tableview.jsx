import React,{ Component } from 'react';
import './bodyallfile.css';
import { GoFile,GoFileMedia,GoFilePdf } from "react-icons/go";
import { AiFillFilePpt,AiFillFileWord } from "react-icons/ai";
class Tableview extends React.Component{
    constructor(props){
        super(props)
        //console.log(this.props.filer._id)
        var data=this.props.filer
        var filename=data.filename
        var modifiedfilename=filename.split('.')
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
        var contentsize=modifiedfilename.length
        this.state={
            name:modifiedfilename[0],
            date:modifieduploaddate[0],
            Uploadedby:owner,
            size:modifiedsize,
            content:modifiedfilename[contentsize-1],
            link:'https://apinotessh.herokuapp.com/files/'+data.filename
        }
    }
    render(){
        var {name,date,Uploadedby,size,content,link}=this.state
        if(content=='jpeg' || content=='jpg' || content=='png'){
            return (
                <tr>
                    <th scope="row"><a className="tabular" href={link} target="_blank"><GoFileMedia className="fileadjuster"/></a></th>
                    <td><a className="tabular" href={link} target="_blank">{name}</a></td>
                    <td>{date}</td>
                    <td>{Uploadedby}</td>
                    <td>{size}</td>
                    <td>{content}</td>
                </tr>
            )
        }
        else if(content=='pdf'){
            return (
                <tr>
                    <th scope="row"><a className="tabular" href={link} target="_blank"><GoFilePdf className="fileadjuster"/></a></th>
                    <td><a className="tabular" href={link} target="_blank">{name}</a></td>
                    <td>{date}</td>
                    <td>{Uploadedby}</td>
                    <td>{size}</td>
                    <td>{content}</td>
                </tr>
            )
        }
        else if(content=='ppt'){
            return (
                <tr>
                    <th scope="row"><a className="tabular" href={link} target="_blank"><AiFillFilePpt className="fileadjuster"/></a></th>
                    <td><a className="tabular" href={link} target="_blank">{name}</a></td>
                    <td>{date}</td>
                    <td>{Uploadedby}</td>
                    <td>{size}</td>
                    <td>{content}</td>
                </tr>
            )
        }
        else if(content=='docx'){
            return (
                <tr>
                    <th scope="row"><a className="tabular" href={link} target="_blank"><AiFillFileWord className="fileadjuster"/></a></th>
                    <td><a className="tabular" href={link} target="_blank">{name}</a></td>
                    <td>{date}</td>
                    <td>{Uploadedby}</td>
                    <td>{size}</td>
                    <td>{content}</td>
                </tr>
            )
        }
        else{
            return (
                <tr>
                    <th scope="row"><a className="tabular" href={link} target="_blank"><GoFile className="fileadjuster"/></a></th>
                    <td><a className="tabular" href={link} target="_blank">{name}</a></td>
                    <td>{date}</td>
                    <td>{Uploadedby}</td>
                    <td>{size}</td>
                    <td>{content}</td>
                </tr>
            )
        }
    }
}

export default Tableview