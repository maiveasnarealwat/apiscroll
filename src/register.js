import React from "react";
import fetch from "isomorphic-fetch";
import ReactDOM from 'react-dom';
import "./Api.css";
import { Link ,Redirect } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    
         this.state = {
        route : false,
        email  : "",
        password : "",
        isLoad : false ,
        ErrorPassword : false , 
        ErrorEmail : false ,
        status : "",
        contacts : [],

                        }
    }   

    // fuction from library react 

    componentWillMount() {
        console.log(this.loaduser())
    }
    // create function call more data
    loadMore =()=>{

    }

    // create function loaduser from api data
    loaduser=()=>{   
           const {contacts} = this.state;
              
           const url = 'https://api.github.com/search/repositories?q=java';
           fetch (url)
           .then(response => response.json())
           .then(json =>this.setState(
               {
                   contacts: [ ...contacts , ...json.items],
                   isLoad : true
               }
             
           ))    
             console.log(contacts);   
    }
    
    //Create function Message Error
    messageError = ()=>{
        var  msgErr = "";
        if(this.state.email==="" && this.state.password ===""){
              this.state.ErrorEmail = true ;
              this.state.ErrorPassword = true ;
               msgErr ="Please Enter Email and Password";
        }else{
            if(this.state.email === ""){
                this.state.ErrorEmail = true ;
                msgErr = "Please Enter Email";
            }else if(this.state.password===""){
                this.state.ErrorPassword = true ;
                msgErr ="Please Enter Password";
            }else{
                this.state.ErrorEmail = false;
                this.state.ErrorPassword = false ;
                msgErr = "";
            }
        }
        return msgErr ;
    }

    //Create function get value  Email
  handleChange= (e)=>{
       const lEmail = e.target.value;
       this.setState({
           email : lEmail
       });
       console.log("Email :", lEmail);
             
    }

    // Create function get value Password
    handlePassword = (e)=>{
         this.setState({
              password : e.target.value
         })
    }

   //Create function on Click Log In
    login = (e) =>{  
         this.messageError();
        if(this.state.ErrorPassword== true || this.state.ErrorEmail==true){
             this.setState({status : this.messageError ()})
        }else{
            this.setState({status : ""})
            this.state.contacts.map(item=>{
               if(this.state.email== item.name && this.state.password == item.id){
                   this.setState({route : true ,status  : ''});                   
                    return this.state.route ;
               }else{
                     this.setState({status  : 'Please try again'});                     
               }
               
            })
        }
    }

    
    render (){         
        if(this.state.route){           
            return(<Redirect to="/"/> )
             
        }else{
        return (
            
             <div className="container justify-content-center">                  
                <div className="col-xl-12 col-md-12 col-sm-12 col-12" >
                   <nav class="navbar bg-danger fixed">
                            <a className="navbar-brand font-weight-bold font-white" href="#">Register Account</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <form class="form-inline my-2 my-lg-0 float-right">    
                                <Link to="/" className="btn btn-primary btn-sm"><i className="fas fa-home"></i></Link>  
                            </form>
                   </nav>   
                </div>  
                <ul className="row col-xl-12 col-md-12 col-sm-12 col-12 justify-content-center">
                    <li>                              
                        <div className="d-flex justify-content-center h-100 mt-5">
                            <div class="user_card">
                                <div className="d-flex justify-content-center">
                                    <div className="brand_logo_container">
                                        <img src="../dist/img/logo.jpg" className="brand_logo" alt="Logo"/>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center form_container">
                                    <form>
                                        <div className="input-group mb-3 mt-5">
                                            <div className="input-group-append">
                                                <span className="input-group-text"><i class="fas fa-user"></i></span>
                                            </div>
                                            <input value = {this.state.email} className="form-control input_user" placeholder="Enter Email" onChange={this.handleChange}/>
                                        </div>
                                        <div className="input-group mb-2">
                                            <div className="input-group-append">
                                                <span className="input-group-text"><i class="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" value= {this.state.password} className="form-control input_pass" placeholder="Enter  Password" onChange={this.handlePassword}/>
                                        </div>  
                                        <div className="input-group mb-2">
                                            <div className="input-group-append">
                                                <span className="input-group-text"><i class="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" value= {this.state.password} className="form-control input_pass" placeholder="Comfirm Password" onChange={this.handlePassword}/>
                                        </div> 
                                         <div className="d-flex justify-content-center login_container">
                                                <span className="text-white">{this.state.status}</span>
                                       </div>                  
                                        <div className="d-flex justify-content-center mt-3 login_container">
                                            <Link type="button" name="button" className="btn login_btn mr-3" to="/login">Back</Link>
                                            <button type="button" name="button" class="btn login_btn" onClick={this.login}>Save</button>
                                       </div>
                                 </form>
                            </div>   
                            </div>
                        </div>
                             
                    </li>
                </ul>
           </div>
        )
     } }
    
}