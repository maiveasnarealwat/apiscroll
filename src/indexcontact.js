import React from "react";
import fetch from "isomorphic-fetch";
import contactt from "./contact";
import ReactDOM from 'react-dom';
import "./Api.css";
import { Link } from "react-router-dom";
import prodid from "./productDetail"


export default class  ContactList extends React.Component{
       state = {
           contacts: [],
           per : 1 ,
           page : 50,
           totalPage : null,
           scrolling : false ,
           strSearch : "",
           id : [] ,
           isLoad : false 
       }
       //function liftcycle from class React
       componentWillMount = () => {
           this.loadContacts ();
           this.handleScrollListener = window.addEventListener("scroll",(e)=>{
               this.handleScroll(e);
           })
       };
       // Crate function event scroll on windows
       handleScroll =()=> {        
           const {page , per , totalPage ,scrolling} = this.state;
           if(scrolling)return ;
           if(totalPage <= page) return
           const lastLi =document.querySelector('ul.row > li:last-child');
           if(lastLi!=null || lastLi!="" || lastLi!=undefined){
           const lastLiOffset = lastLi.offsetTop  + lastLi.clientHeight;
         
           const pageOffset =window.pageYOffset + window.innerHeight;
           var buttonOffset  =50;
           if(pageOffset > lastLiOffset - buttonOffset) this.loadMore();
           }else{
               return;
           }
       }
       //Create function load more data when u scroll down
       loadMore =()=> {
           this.setState(prevState => ({
               page : prevState.page +1,
               scrolling : true,
           }),this.loadContacts )
             
       }
      //Create Function load Data from API
       loadContacts =()=>{
           const {per , page ,totalPage , contacts} =this.state;
           const url = 'https://api.github.com/search/repositories?q=php?page='+per+'&per_page='+page+'';
           fetch (url)
           .then(response => response.json())
           .then(json =>this.setState(
               {
                   contacts: [ ...contacts , ...json.items],
                   scrolling : false ,
                   totalPage : json.total_pages,
                   isLoad : true
                   
               }
               
           ))
           
       }
      // Crate function Search Text
       searchText =(strSearch)=>{
           const {per , page ,totalPage , contacts} =this.state;
           const url = 'https://api.github.com/search/repositories?q='+strSearch+'"?page='+per+'&per_page='+page+'';
           fetch (url)
           .then(response => response.json())
           .then(json =>this.setState(
               {
                   contacts: [ ...contacts , ...json.items],
                   scrolling : false ,
                   totalPage : json.total_pages
               }
           ))
       }
       // Create function undate value on change event
       updateInputValue = evt => {
           var {strSearch} = this.state;
           strSearch =evt.target.value;
           this.setState({
               strSearch : strSearch
           });
           console.log(strSearch);         
       }
    
     

    render(){
      
        const {strSearch} = this.state;
        if (!this.state.isLoad) {
           return <div className="App">
                <img className="loading" src="../dist/img/loading.gif"/>
           </div>
       } else{
        return (     
            
             
             <div className="container justify-content-center">                  
                <div className="col-xl-12 col-md-12 col-sm-12 col-12" >
                   <nav class="navbar bg-danger fixed">
                            <a className="navbar-brand font-weight-bold font-white" href="#">Data API</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <form class="form-inline my-2 my-lg-0 float-right">    
                                <Link to="/login" className="btn btn-warning btn-circle"><i className="fas fa-user"></i></Link>  
                            </form>
                   </nav>   
                </div>      
                <ul className="row mt-3 col-xl-12 col-md-12 col-sm-6 float-left">  
                     
                      {   
                        this.state.contacts.map(item =>
                        <li className="col-xl-4 col-md-4 col-md-4"> 
                                 {/* {console.log("Total Page ::",this.state.contacts)} */}
                                <div class="card card-widget widget-user box">                                
                                <div class="widget-user-header bg-info"> 
                                    <h3 class="widget-user-username" >{item.full_name}</h3>
                                    <h5 class="widget-user-desc">{item.name}</h5>                                    
                                </div>
                                <Link to={'/pd/' +item.id}> 
                                    <div className="widget-user-image">                              
                                        <img className="img-circle elevation-2 img1" src={item.owner.avatar_url} alt="User Avatar"/>                            
                                    </div>
                                </Link>                              
                                <div className="card-footer bg-danger">
                                    <div class="row">
                                    <div class="col-sm-4 border-right">
                                        <div class="description-block">
                                        <h5 class="description-header">{item.watchers}</h5>
                                        <span class="description-text"><i className= "fa fa-eye mr-1 text-primary"></i>views</span>
                                        </div>
                                    
                                    </div>                                    
                                    <div class="col-sm-4 border-right">
                                        <div class="description-block">
                                         <h5 class="description-header">{item.stargazers_count}</h5>
                                        <span class="description-text"><i className= "fa fa-star mr-1 text-warning"></i>star</span>
                                        </div>
                                    
                                    </div>
                                    
                                    <div class="col-sm-4">
                                        <div class="description-block">
                                        <h5 class="description-header">{item.forks_count}</h5>
                                        <span class="description-text"><i className= "fa fa-users mr-1 text-success"></i>Counter</span>
                                        </div>                                    
                                    </div>                                    
                                    </div>                                
                                </div>
                            </div>
                        </li>
                        )
                    }                     
                </ul>
              </div>
             
             

        
        
        
        
        
      ) 

       }
    }
}