import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

let port ='http://localhost:5000';

class App extends Component {

constructor(props){
  super(props);
  this.state = {
    data: []
  }
  
}

componentDidMount(){
  axios.get(port).then(res => {
    this.setState({data: res.data})
    console.log(this.state.data);
  })
}

  render() {
    return (
      <div className="App">
        {this.state.data.map((item, id) => {return (
          <div className='Name_block'>
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
