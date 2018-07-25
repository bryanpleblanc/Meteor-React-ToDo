import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class LoginSplash extends Component {


    registerUser(event) {
        event.preventDefault();
        const username = ReactDOM.findDOMNode(this.refs.registerTextUserName).value;
        const password = ReactDOM.findDOMNode(this.refs.registerTextPassword).value;
        Meteor.call("Create New User",username, password, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        });
    }

    loginUser(event) {
        event.preventDefault();
        const username = ReactDOM.findDOMNode(this.refs.loginTextUserName).value;
        const password = ReactDOM.findDOMNode(this.refs.loginTextPassword).value;

        Meteor.loginWithPassword(username, password, function (error) {
            if (error) {
            } else {
            }
        })
    }


    render() {

        return (
           <div>
               <h4>Login</h4>
               <form className="login"  >
                   <input type="text" ref="loginTextUserName" placeholder="Username..."/>
                   <input type="password" ref="loginTextPassword" placeholder="Password..."/>
                   <button onClick={this.loginUser.bind(this)}>Login</button>
               </form>


               <h4>Register</h4>
               <form className="register" >
                   <input type="text" ref="registerTextUserName" placeholder="Username..."/>
                   <input type="password" ref="registerTextPassword" placeholder="Password..."/>
                   <button onClick={this.registerUser.bind(this)}>Register</button>
               </form>
           </div>
        );
    }
}