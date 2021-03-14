import React from 'react';
import Logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.js';
import './Login.css'


class Login extends React.Component{
    state={
        email:'',
        pwd:''
    }

    handleChange = (e) =>{
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        <Router path="/App" />
    }

    render(){
        return(
            <div className='div-login'>
                <div className='div-login-logo'>
                    <img src={Logo} />
                </div> 
                <Router>
                    <div className="App">
                        <form onSubmit = {this.handleSubmit}>
                            <input type='email' name='email' placeholder='email...' required onChange={this.handleChange}/>
                            <input type='password' name='pwd' placeholder='password' required onChange={this.handleChange}/>
                            <button onSubmit={this.handleSubmit}>Login</button>
                            
                        </form>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Login;