import React, { Component } from 'react';
import axios from 'axios';
import { setTimeout } from 'timers';

let port ='https://pure-earth-94858.herokuapp.com';
//let port ='http://localhost:5000';

class AuthFront extends Component {

//Registration Fields



RegDataSend(){
    let email = document.getElementsByClassName("Reg_login")[0];
    let adress =  document.getElementsByClassName("Reg_email")[0];
    let pass = document.getElementsByClassName("Reg_pass")[0];
    let mass = [];

    if(email.value !== "" && adress.value !== "") {
        if(pass.value !== "") {
            mass.push(email.value, adress.value, pass.value);

            axios.post(port + '/registration', mass).then(res => {
                if(res.data === true) {
                    document.getElementsByClassName("Reg_login")[0].value = "";
                    document.getElementsByClassName("Reg_email")[0].value = "";
                    document.getElementsByClassName("Reg_pass")[0].value = "";
                    document.getElementsByClassName("Reg_block")[0].style.cssText = "display: none";
                    document.getElementsByClassName("SuccessReg")[0].style.cssText = "display: block";
                    setTimeout(function(){
                        document.getElementsByClassName("SuccessReg")[0].style.cssText = "display: none";
                    }, 3000);
        
                }
            });

        } else {
            alert("Заполните все поля!");
        }
    } else {
        alert("Заполните все поля!");
    }



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


HideLogIn() {
    let Auth_block = document.getElementsByClassName("Auth_block")[0];
    Auth_block.style.cssText = "display: none";
}

HideReg(){
    let Auth_block = document.getElementsByClassName("Registration_block")[1];
    Auth_block.style.cssText = "display: none";
}

render() {
    return (
        <div>
            <section className="col-md-12 col-sm-12 col-xs-12 Authorization Registration_block SuccessReg">
                <p className="col-md-12 col-sm-12 col-xs-12 Success_Reg_Text">Зарегистрированы!</p>
            </section>

            <section className="col-md-12 col-sm-12 col-xs-12 Authorization Registration_block Reg_block">
                <input type= "text" className="col-md-2 col-sm-2 col-xs-12 Controller_Inputs_ListName Auth_inp Reg_login" placeholder="Логин" />
                <input type= "text" className="col-md-2 col-sm-2 col-xs-12 Controller_Inputs_ListName Auth_inp Reg_email" placeholder="Email" />
                <input type= "password" className="col-md-2 col-sm-2 col-xs-12 Controller_Inputs_ListName Auth_inp Reg_pass" placeholder="Пароль" />
                <button className="col-md-2 col-sm-2 col-xs-12 Registration_btn_1 AddSave_btn_2" onClick={this.RegDataSend.bind(this)}>Регистрировать</button>
                <div className="col-md-1 col-sm-1 col-xs-12 Hide_auth_field" onClick={this.HideReg.bind(this)}><button className="Registration_btn_1 Registration_btn_2 Controller_Inputs_plus Hide_Auth_btn"><div className="RangePlus Auth_plus">+</div></button></div>
            </section>

            <section className="col-md-12 col-sm-12 col-xs-12 Authorization Auth_block">
                <input type= "text" className="col-md-3 col-sm-3 col-xs-12 Controller_Inputs_ListName Auth_inp Auth_login" placeholder="Логин" />
                <input type= "password" className="col-md-3 col-sm-3 col-xs-12 Controller_Inputs_ListName Auth_inp Auth_pass" placeholder="Пароль" />
                <button className="col-md-3 col-sm-2 col-xs-12 Registration_btn_1 AddSave_btn_2" onClick={this.props.logInData}>Войти</button>
                <div className="col-md-1 col-sm-1 col-xs-12 Hide_auth_field" onClick={this.HideLogIn.bind(this)}><div className="Registration_btn_1 Registration_btn_2 Controller_Inputs_plus Hide_Auth_btn"><div className="RangePlus Auth_plus">+</div></div></div>
            </section>
        </div>

        









        // <div className="Auth"> 

        // <div className="twoForms"> 


        //     <form className="LogInField">
        //     <button type="button" className="close" id="LogInClose" aria-label="Close" onClick={this.hideReg.bind(this)}>
        //         <span aria-hidden="true">&times;</span>
        //     </button>
        //         <div className="form-group">
        //             <label htmlFor="LogInEmail">Email address</label>
        //             <input type="email" className="form-control" id="LogInEmail" aria-describedby="emailHelp" placeholder="Enter email or login name" />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="LogInPass">Password</label>
        //             <input type="password" className="form-control" id="LogInPass" aria-describedby="emailHelp" placeholder="Enter password" />
        //         </div>
        //         <div>
        //         <button type="button" className="LogInButton btn btn-primary" onClick={this.props.logInData}>Войти</button>
        //         </div>          
        //     </form>

        //     <form className="RegistrationField">
        //     <button type="button" className="close" id="LogInClose2" aria-label="Close" onClick={this.hideReg.bind(this)}>
        //         <span aria-hidden="true">&times;</span>
        //     </button>
        //         <div className="form-group">
        //             <label htmlFor="RegistrationEmail">User name</label>
        //             <input type="text" className="form-control" id="RegistrationEmail" aria-describedby="emailHelp" placeholder="Enter login" />
        //         </div>

        //         <div className="form-group">
        //             <label htmlFor="RegistrationEmail">Email address</label>
        //             <input type="email" className="form-control" id="RegistrationAdress" aria-describedby="emailHelp" placeholder="Enter email" />
        //         </div>

        //         <div className="form-group">
        //             <label htmlFor="RegistrationPass">Password</label>
        //             <input type="password" className="form-control" id="RegistrationPass" aria-describedby="emailHelp" placeholder="Enter password" />
        //         </div>
        //         <div>
        //         <button type="button" className="RegistrationButton btn btn-primary" onClick={this.RegDataSend.bind(this)}>Регистрация</button>
        //         </div>          
        //     </form>
        //     </div>

        //     <div className="col-md-5 RegSucess">
        //         <div className="alert alert-success" role="alert">
        //             <h4 className="alert-heading">Вы успешно зарегистрированы!</h4><hr/>
        //             <p className="mb-0">Теперь зайдите в систему.</p>
        //         </div>
        //     </div>


        //     <div className="auth_Name col-md-12">
        //         <p className="ath">Добрый день, <b><span id="Auth_Name_field">Василий</span></b>.<span className="LogOut" onClick={this.LogOut.bind(this)}>Выйти.</span></p>
        //     </div>
            
        //     <div className="col-md-12 AuthButtons">          
        //         <button type="button" className="RegButton btn btn-light" onClick={this.Reg.bind(this)}>Регистрация</button>
        //         <button type="button" className="LogInButton btn btn-light" onClick={this.showLogIn.bind(this)}>Войти</button>
        //     </div>
        // </div>

    )
}

}

export default AuthFront;