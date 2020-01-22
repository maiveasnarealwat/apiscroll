import React from "react";
import fetch from "isomorphic-fetch";
import contactt from "./contact";
import ReactDOM from 'react-dom'


export default class  ContactList extends React.Component{
       state = {
           contacts: [],
           per : 1 ,
           page : 20 ,
           totalPage : null,
           scrolling : false ,
       }
       
       componentWillMount = () => {
           this.loadContacts ();
           this.handleScrollListener = window.addEventListener("scroll",(e)=>{
               this.handleScroll(e);
           })
       };
       handleScroll =()=> {
           const {page , per , totalPage ,scrolling} = this.state;
           if(scrolling)return ;
           if(totalPage <= page) return
           const lastLi =document.querySelector('ul.contacts > li:last-child')
           const lastLiOffset = lastLi.offsetTop  + lastLi.clientHeight
           const pageOffset =window.pageYOffset + window.innerHeight
           var buttonOffset  =20
           if(pageOffset > lastLiOffset - buttonOffset) this.loadMore()
       }
       loadMore =()=> {
           this.setState(prevState => ({
               page : prevState.page +1,
               scrolling : true,
           }),this.loadContacts )

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
                   totalPage : json.total_pages
               }
           ))
       }
       



    render(){

        return (
              <ul className="App">
                 {
                     this.state.contacts.map(item =><li key={item.id}>
                    {
                        item.name
                    }
                    
                     </li>)
                 }
              </ul>

        )
    }
}