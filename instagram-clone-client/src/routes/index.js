import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import decode from 'jwt-decode';
import { ContextStore } from '../store'

import 'semantic-ui-css/semantic.min.css'
import '../css/main.css'

import Home from './home';
import Login from './login';

const Logout = () => {
    localStorage.removeItem("token");

    return <Redirect to="/login"/>
}

const isAuthenticated = ()=>{
    const token = localStorage.getItem("token");
    let isValid = true;
    try{
        isValid = decode(token);
    }catch(e){
        return false;
    }
    return isValid;
};

const MyRoute = (props) => (
    isAuthenticated() 
        ? <Route {...props} />
        : <Redirect to="/login" />
)

export default ()=>(
    <Router>
        <Switch>
            <MyRoute path="/" exact component={Home}/>
            <Route path="/home" exact render={props=><ContextStore comp={<Home />}/>}/>
            <Route path="/login" exact component={Login}/>
            <MyRoute path="/logout" exact component={Logout}/>
        </Switch>
    </Router>
)