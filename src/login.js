import React from "react";
import fetch from "isomorphic-fetch";
import ReactDOM from 'react-dom';
import "./Api.css";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    state = {
        email : "",
        password : "",
        isLoad : false ,
        ErrorPassword : false , 
        ErrorEmail : false ,
    }
    componentWillMount() {
        
    }
    //Create function handleEvent 
   handleEmail= (e)=>{
      const  {email} = this.state;
       this.email = e.target.value;
       this.setState({
           email : this.email
       });
       console.log(this.state.email);
             
    }
    handlePassword = (e)=>{
         console.log(e.target.value);
    }
    
    render (){
        return (
             <div className="container justify-content-center">                  
                <div className="col-xl-12 col-md-12 col-sm-12 col-12" >
                   <nav class="navbar bg-danger fixed">
                            <a className="navbar-brand font-weight-bold font-white" href="#">Log In Account</a>
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
                        <div class="d-flex justify-content-center h-100 mt-5">
                            <div class="user_card">
                                <div class="d-flex justify-content-center">
                                    <div class="brand_logo_container">
                                        <img src="../dist/img/logo.jpg" className="brand_logo" alt="Logo"/>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center form_container">
                                    <form>
                                        <div class="input-group mb-3 mt-3">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                            </div>
                                            <input type="text" value = {this.state.email} className="form-control input_user" placeholder="username" onChange={this.handleEmail}/>
                                        </div>
                                        <div class="input-group mb-2">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" className="form-control input_pass" placeholder="password" onChange={this.handlePassword}/>
                                        </div>                    
                                            <div class="d-flex justify-content-center mt-3 login_container">
                                            <button type="button" name="button" class="btn login_btn">Login</button>
                                       </div>
                                 </form>
                            </div>   
                            </div>
                        </div>
                             
                    </li>
                </ul>
           </div>
        )
    }
}