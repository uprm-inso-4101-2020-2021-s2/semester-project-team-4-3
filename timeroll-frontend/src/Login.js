import React, { Component } from 'react';
import Logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.js';
import './Login.css'
import './Menu.js'
import axios from 'axios';
import Cookies from 'universal-cookie';


const baseUrl="http://localhost:3005/users";
const cookies = new Cookies();


class Login extends React.Component{
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange = async e =>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        // const {name,value} = e.target
        // this.setState({[name]:value})
        console.log(this.state.form);
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        <Router path="/Menu" />
    }

    initSess=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: this.state.form.password}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var response=response[0];
                cookies.set('id', response.id, {path: "/"});
                cookies.set('Last_Name', response.Last_Name, {path: "/"});
                cookies.set('Name', response.name, {path: "/"});
                cookies.set('username', response.username, {path: "/"});
                alert(`Welcome ${response.Name} ${response.Last_Name}`);
                window.location.href="./App";
            }else{
                alert('Username or password is incorrect');
            }
        })
        .catch(error=>{
            console.log(error);
        })

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
                            <input type='username' name='username' placeholder='username...' required onChange={this.handleChange}/>
                            <input type='password' name='password' placeholder='password...' required onChange={this.handleChange}/>
                            <button onClick={()=>this.initSess()}>Login</button>
                            {/* <button onSubmit={this.handleSubmit}>Login</button> */}
                            
                        </form>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Login;