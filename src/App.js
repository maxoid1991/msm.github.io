import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';
import Del_Block from './delete-block';

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
  let firstfield = document.getElementById('exampleInputEmail1').value;
  let secondfield = document.getElementById('exampleInputPassword1').value;
  let thirdfield = document.getElementById('exampleInputPassword2').value;

  let new_block = {"name":firstfield, "age": secondfield, city: thirdfield};
  this.setState({data:[...this.state.data, new_block]});
};


  render() {
    return (
      <div className="App" id="App">
        
        <Form PostData={this.PostData.bind(this)}/>

        {this.state.data.map((item, id) => {return (
          <div id={id} className='Name_block col-md-2 col-xs-6 col-sm-4'>
            <Del_Block ref="a"/>
            <p key={0} className='Name_field'>{item.name}</p>
            <p key={1} className='Name_field'>{item.age}</p>
            <p key={1} className='Name_field'>{item.city}</p>          
          </div>
        )})}

      </div>
    );
  }
}

export default App;
