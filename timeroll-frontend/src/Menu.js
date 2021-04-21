import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends Component {
    signOut=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('Last_name', {path: "/"});
        cookies.remove('Name', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('Last_Name: '+cookies.get('Last_Name'));
        console.log('Name: '+cookies.get('name'));
        console.log('username: '+cookies.get('username'));
        return (
            <div>
                Main Menu
                <br />
                <button onClick={()=>this.signOut()}>Sign Out</button>
            </div>
        );
    }
}

export default Menu;