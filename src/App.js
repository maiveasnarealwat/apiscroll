import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactList from "./indexcontact";
import product from "./productDetail";
import login from "./login"
import register from "./register"
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>       
         <Switch>
            {/* <ContactList></ContactList> */}
           <Route path="/"  exact strict render= {()=>{return (<ContactList/>)}} ></Route>
           <Route path="/pd/:id" name="pd" component={product} ></Route>
            <Route path="/login" name="login" component={login} ></Route>
            <Route path="/register" name="register" component={register} ></Route>
        </Switch>
      
    </Router>
  );
}

export default App;
