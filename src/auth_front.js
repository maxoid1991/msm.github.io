import React, { Component } from 'react';
import axios from 'axios';

class AuthFront extends Component {
    constructor(props){
        super(props);
    }


//Registration Fields    

showLogIn(){
    let FormsField = document.getElementsByClassName("twoForms")[0].style.cssText = "margin: 0px auto; height: 250px;";
    let LogInField = document.getElementsByClassName("LogInField")[0].style.cssText = "top: 0px; opacity: 1";
    let RegField = document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: -320px; opacity: 0";
}

Reg(){
    let FormsField = document.getElementsByClassName("twoForms")[0].style.cssText = "margin: 0px auto; height: 330px;";
    let LogInField = document.getElementsByClassName("LogInField")[0].style.cssText = "top: -320px; opacity: 0";
    let RegField = document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: 0px; opacity: 1";
}

hideReg(){
    let FormsField = document.getElementsByClassName("twoForms")[0].style.cssText = "margin: -320px auto 0; height: 330px;";
    let LogInField = document.getElementsByClassName("LogInField")[0].style.cssText = "top: -320px; opacity: 0";
    let RegField = document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: -320px; opacity: 1";

}

render() {
    return (
        <div className="Auth"> 

        <div className="twoForms"> 


            <form className="LogInField">
            <button type="button" class="close" id="LogInClose" aria-label="Close" onClick={this.hideReg.bind(this)}>
                <span aria-hidden="true">&times;</span>
            </button>
                <div class="form-group">
                    <label for="LogInEmail">Email address</label>
                    <input type="email" className="form-control" id="LogInEmail" aria-describedby="emailHelp" placeholder="Enter email or login name" />
                </div>
                <div class="form-group">
                    <label for="LogInPass">Password</label>
                    <input type="password" className="form-control" id="LogInPass" aria-describedby="emailHelp" placeholder="Enter password" />
                </div>
                <div>
                <button type="button" className="LogInButton btn btn-primary" onClick={this.props.logInData}>Войти</button>
                </div>          
            </form>

            <form className="RegistrationField">
            <button type="button" class="close" id="LogInClose" aria-label="Close" onClick={this.hideReg.bind(this)}>
                <span aria-hidden="true">&times;</span>
            </button>
                <div class="form-group">
                    <label for="RegistrationEmail">User name</label>
                    <input type="text" className="form-control" id="RegistrationEmail" aria-describedby="emailHelp" placeholder="Enter login" />
                </div>

                <div class="form-group">
                    <label for="RegistrationEmail">Email address</label>
                    <input type="email" className="form-control" id="RegistrationEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>

                <div class="form-group">
                    <label for="RegistrationPass">Password</label>
                    <input type="password" className="form-control" id="RegistrationPass" aria-describedby="emailHelp" placeholder="Enter password" />
                </div>
                <div>
                <button type="button" className="RegistrationButton btn btn-primary">Регистрация</button>
                </div>          
            </form>
            </div>
            
            <div className="col-md-12 AuthButtons">          
                <button type="button" className="RegButton btn btn-light" onClick={this.Reg.bind(this)}>Регистрация</button>
                <button type="button" className="LogInButton btn btn-light" onClick={this.showLogIn.bind(this)}>Войти</button>
            </div>
        </div>

    )
}

}

export default AuthFront;