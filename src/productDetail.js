import React from "react"
import ReactDom from "react-dom"
import "./Api.css";
import fetch from "isomorphic-fetch";
import { Link } from "react-router-dom";


export default  class productDetail extends React.Component{
    state = {
           contacts: [],
           per : 1 ,
           page : 50 ,
           totalPage : null,
           scrolling : false ,
           strSearch : "",
           id : [] ,
           name : "",
           star : 0 ,
           counter : 0,
           image : "",
           fullName : "",
           watchers : 0,
           language : "",
           description : "",
           default_branch : "",
           isLoad : false ,
       }
       
    componentWillMount() {
        this.loadContacts ();
    }
    loadContacts =()=>{
           const {per , page ,totalPage , contacts} =this.state;
           const url = 'https://api.github.com/search/repositories?q=java?page='+per+'&per_page='+page+'';
           fetch (url)
           .then(response => response.json())
           .then(json =>this.setState(
               {
                   contacts: [ ...contacts , ...json.items],
                   scrolling : false ,
                   totalPage : json.total_pages ,
                   isLoad : true
               }
           ))
       }
    
   render(){
         const idd = this.props.match.params.id;
         const {name , image , counter , star ,watchers , fullName ,language , description ,default_branch} = this.state;
       return(
           <div className="container ba-dander">
            <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12 col-12" >
                   <nav class="navbar bg-danger fixed">
                            <a className="navbar-brand font-weight-bold font-white" href="#">Profile Detail</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <form class="form-inline my-2 my-lg-0 float-right">
                                 <Link to={'/'} className="btn btn-primary btn-md">Show All</Link>
                            </form>
                    </nav>   
                </div>           
            <ul className = "row">   
               <li className="col-xl-4 col-md-4 col-md-4">                         
                {
                    this.state.contacts.map(item =>{
                     if(item.id==idd)                      
                      {
                         var id = idd ;
                         this.name = item.name;
                         this.fullName =item.full_name;
                         this.watchers = item.watchers;
                         this.image =item.owner.avatar_url;
                         this.star =item.stargazers_count;
                         this.counter =item.forks_count;
                         this.language =item.language;
                         this.description  = item.description;
                         this.default_branch =item.default_branch;
                         
                      }                     
                    })
                    
                } 
               </li>                        
            </ul>            
            <div className="col-xl-6 col-md-6 col-md-6">                     
                    <div class="card card-widget widget-user box">                                
                    <div class="widget-user-header bg-info"> 
                        <h3 class="widget-user-username" >{this.name}</h3>
                    </div>                   
                        <div className="widget-user-image">                              
                            <img className="img-circle elevation-2 img1" src={this.image} alt="profile"/>                            
                        </div>                    
                    <div className="card-footer bg-danger">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">{this.watchers}</h5>
                                    <span class="description-text"><i className= "fa fa-eye mr-1 text-primary"></i>views</span>
                                </div>                        
                            </div>                        
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">{this.watchers}</h5>
                                    <span class="description-text"><i className= "fa fa-star mr-1 text-warning"></i>star</span>
                                </div>
                            
                            </div>                        
                            <div class="col-sm-4">
                                <div class="description-block">
                                <h5 class="description-header">{this.counter}</h5>
                                <span class="description-text"><i className= "fa fa-users mr-1 text-success"></i>Counter</span>
                                </div>                                    
                            </div>    
                            <div className="col-sm-12 bg-danger">                                
                            <ul className="list-group list-group-unbordered mb-3 text-black">
                                <li class="list-group-item">
                                   <b>Name </b> <a class="float-right">{this.fullName}</a>
                                </li>
                                <li class="list-group-item">
                                   <b>Language</b> <a class="float-right">{this.language}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Default Branch</b> <a class="float-right">{this.default_branch}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Description</b> <a class="float-right">{this.description}</a>
                                </li>
                                </ul>

                            </div>                     
                                                         
                        </div>                                
                    </div>
                </div>
              </div>  
            </div>       
           </div>
       )
   }

}