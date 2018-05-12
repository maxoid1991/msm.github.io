import React, { Component } from 'react';
import axios from 'axios';
import { setTimeout } from 'timers';

let port ='http://localhost:5000';

class AuthFront extends Component {

//Registration Fields

RegDataSend(){
    let email = document.getElementById("RegistrationEmail").value;
    let adress = document.getElementById("RegistrationAdress").value;
    let pass = document.getElementById("RegistrationPass").value;

    let mass = [];
    mass.push(email, adress, pass);

    axios.post(port + '/registration', mass).then(res => {
        
        if (res.data === true) {
            document.getElementById("RegistrationEmail").value = "";
            document.getElementById("RegistrationAdress").value = "";
            document.getElementById("RegistrationPass").value = "";
            document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: -320px; opacity: 0";
            document.getElementsByClassName("twoForms")[0].style.cssText = "margin: -320px auto 0; height: 330px;";

            //Success registration

            setTimeout(function(){
                document.getElementsByClassName("RegSucess")[0].style.cssText = "height: 120px; overflow: visible; opacity: 1;";
            }, 1000);

            setTimeout(function(){
                document.getElementsByClassName("RegSucess")[0].style.cssText = "height: 0px; overflow: hidden; opacity: 0;";
            }, 5000);

            
        }
    })
}

showLogIn(){
    let FormsField = document.getElementsByClassName("twoForms")[0].style.cssText = "margin: 0px auto; height: 250px;";
    let LogInField = document.getElementsByClassName("LogInField")[0].style.cssText = "top: 35px; opacity: 1";
    let RegField = document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: -320px; opacity: 0";
}

Reg(){
    let FormsField = document.getElementsByClassName("twoForms")[0].style.cssText = "margin: 0px auto; height: 330px;";
    let LogInField = document.getElementsByClassName("LogInField")[0].style.cssText = "top: -320px; opacity: 0";
    let RegField = document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: 35px; opacity: 1";
}

hideReg(){
    let FormsField = document.getElementsByClassName("twoForms")[0].style.cssText = "margin: -320px auto 0; height: 330px;";
    let LogInField = document.getElementsByClassName("LogInField")[0].style.cssText = "top: -320px; opacity: 0";
    let RegField = document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: -320px; opacity: 1";

}

// Log Out Function

LogOut(){
    console.log("hi!")
    let logOutmass = [0];
    axios.post(port + '/auth_logout', logOutmass).then(res => {
        console.log('Data recieved!');
        window.location.href = window.location.href;
      })
}

render() {
    return (
        <div className="Auth"> 

        <div className="twoForms"> 


            <form className="LogInField">
            <button type="button" className="close" id="LogInClose" aria-label="Close" onClick={this.hideReg.bind(this)}>
                <span aria-hidden="true">&times;</span>
            </button>
                <div className="form-group">
                    <label htmlFor="LogInEmail">Email address</label>
                    <input type="email" className="form-control" id="LogInEmail" aria-describedby="emailHelp" placeholder="Enter email or login name" />
                </div>
                <div className="form-group">
                    <label htmlFor="LogInPass">Password</label>
                    <input type="password" className="form-control" id="LogInPass" aria-describedby="emailHelp" placeholder="Enter password" />
                </div>
                <div>
                <button type="button" className="LogInButton btn btn-primary" onClick={this.props.logInData}>Войти</button>
                </div>          
            </form>

            <form className="RegistrationField">
            <button type="button" className="close" id="LogInClose2" aria-label="Close" onClick={this.hideReg.bind(this)}>
                <span aria-hidden="true">&times;</span>
            </button>
                <div className="form-group">
                    <label htmlFor="RegistrationEmail">User name</label>
                    <input type="text" className="form-control" id="RegistrationEmail" aria-describedby="emailHelp" placeholder="Enter login" />
                </div>

                <div className="form-group">
                    <label htmlFor="RegistrationEmail">Email address</label>
                    <input type="email" className="form-control" id="RegistrationAdress" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label htmlFor="RegistrationPass">Password</label>
                    <input type="password" className="form-control" id="RegistrationPass" aria-describedby="emailHelp" placeholder="Enter password" />
                </div>
                <div>
                <button type="button" className="RegistrationButton btn btn-primary" onClick={this.RegDataSend.bind(this)}>Регистрация</button>
                </div>          
            </form>
            </div>

            <div className="col-md-5 RegSucess">
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Вы успешно зарегистрированы!</h4><hr/>
                    <p className="mb-0">Теперь зайдите в систему.</p>
                </div>
            </div>


            <div className="auth_Name col-md-12">
                <p className="ath">Добрый день, <b><span id="Auth_Name_field">Василий</span></b>.<span className="LogOut" onClick={this.LogOut.bind(this)}>Выйти.</span></p>
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