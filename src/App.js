import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';
import Del_Block from './delete-block';
import AuthFront from './auth_front';

let port ='http://localhost:5000';

class App extends Component {

constructor(props){
  super(props);
  this.state = {
    data: []
  }
  
}

//Upload data from server

componentDidMount(){
  axios.get(port).then(res => {
    console.log(res.data);
    console.log(res.data.id);
    if (res.data.id > 0) {
      document.body.getElementsByClassName("auth_Name")[0].style.cssText = "display: block";
      document.body.getElementsByClassName("AuthButtons")[0].style.cssText = "display: none";
      document.getElementById("Auth_Name_field").innerHTML = res.data.login;
      console.log('hello')
      this.setState({data: res.data.info})
    } else {
      console.log('buy!')
      this.setState({data: res.data[0].info})
    }



  })
}

//Download input data to server and build new dom element

PostData(){
  let firstfield = document.getElementById('exampleInputEmail1');
  let secondfield = document.getElementById('exampleInputPassword1');
  let thirdfield = document.getElementById('exampleInputPassword2');

  if(firstfield.value, secondfield.value, thirdfield.value !== "") {
    
    let new_block = {"name":firstfield.value, "age": secondfield.value, city: thirdfield.value};
    this.setState({data:[...this.state.data, new_block]});

    firstfield.value = "";
    secondfield.value = "";
    thirdfield.value = "";
  } else {
    alert("Заполните, пожалуйста, все поля формы.")
  }
};


//Send registration data to server

logInData(){
  let EmailLogin = document.getElementById("LogInEmail").value;
  let Pass = document.getElementById("LogInPass").value;
  let EmPass = [];
  EmPass.push(EmailLogin);
  EmPass.push(Pass);
  console.log(EmPass);

  axios.post('/auth_login', EmPass).then(res => {
      console.log(res.data);

      if(typeof res.data == "string") {
        alert(res.data);
      } else {
        this.setState({data: res.data[0].info});
        console.log(res.data);

        //Clear Auth form and hide it

        document.getElementById("LogInEmail").value = "";
        document.getElementById("LogInPass").value = "";
        document.getElementsByClassName("twoForms")[0].style.cssText = "margin: -320px auto 0; height: 330px;"
        document.getElementsByClassName("LogInField")[0].style.cssText = "top: -320px; opacity: 0";
        document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: -320px; opacity: 1";

        document.getElementsByClassName("auth_Name")[0].style.cssText = "display: block";
        document.getElementsByClassName("AuthButtons")[0].style.cssText = "display: none";

        document.getElementById("Auth_Name_field").innerHTML = res.data[0].login;

      }

  })





}


  render() {
    return (
      <div className="App" id="App">

        <AuthFront logInData={this.logInData.bind(this)} />
        
        <Form PostData={this.PostData.bind(this)}/>

        <div className="Blocks">

        {this.state.data.map((item, id) => {return (
          <div id={id} className='Name_block col-md-2 col-xs-6 col-sm-4'>
            <Del_Block ref="a"/>
            <p key={0} className='Name_field'>
              {item.name}
            </p>
            <p key={1} className='Name_field'>
              {item.age}
            </p>
            <p key={1} className='Name_field'>
              {item.city}
            </p>          
          </div>
        )})}

        </div>


      </div>
    );
  }
}

export default App;
