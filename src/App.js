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
    this.setState({data: res.data})
    console.log(this.state.data);
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
        this.setState({data: res.data[0]});
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
