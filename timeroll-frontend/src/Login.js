import React from 'react';
import Logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.js';
import './Login.css'
import './Menu.js'
import axios from 'axios';
import Cookies from 'universal-cookie';


const baseUrl="http://localhost:3000/users";
const cookies = new Cookies();


class Login extends React.Component{
    state={
        username:'',
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

    initSess=()=>{
        axios.get(baseUrl, {params: {username: this.state.form.username, password: this.state.form.password}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('Last_Name', respuesta.Last_Name, {path: "/"});
                cookies.set('Name', respuesta.name, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
                window.location.href="./menu";
            }else{
                alert('El usuario o la contraseña no son correctos');
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
                            <input type='password' name='pwd' placeholder='password' required onChange={this.handleChange}/>
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