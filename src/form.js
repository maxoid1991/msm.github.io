import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props){
        super(props);
     }

       
     SaveAll(){

       let all_blocks = document.getElementsByClassName('Name_block');

       let mass = [];

       for (var i = 0; i < all_blocks.length; i++) {
         let name = all_blocks[i].firstChild.nextSibling.innerHTML;
         let age = all_blocks[i].firstChild.nextSibling.nextSibling.innerHTML;
         let city = all_blocks[i].lastChild.innerHTML;
         mass[i] = {"name": name, "age" : age, "city": city};
       }

       axios.post('/save', mass).then(res => {
        console.log('Data recieved!');
      })
     }

    render(){
        return(
            <form className="col-sm-2">
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Age</label>
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter age"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword2">City</label>
              <input type="text" class="form-control" id="exampleInputPassword2" placeholder="Enter city"/>
            </div>
            <button type="button" class="btn btn-primary " onClick={this.props.PostData}>Submit</button>
            <button type="button" class="btn btn-success submit" onClick={this.SaveAll.bind(this)} >Save all</button>
          </form>
        )
    }    
}

export default Form;