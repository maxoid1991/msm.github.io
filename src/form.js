import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
          date2: [],
        }
     }

       
     SaveAll(){

       let all_blocks = document.getElementsByClassName('Name_block');
       let login = document.getElementById("Auth_Name_field").innerHTML;

       let mass = [
         {
           "login": login,
           "info": []
        }
       ];

       for (var i = 0; i < all_blocks.length; i++) {
         let name = all_blocks[i].firstChild.nextSibling.innerHTML;
         let age = all_blocks[i].firstChild.nextSibling.nextSibling.innerHTML;
         let city = all_blocks[i].lastChild.innerHTML;
         mass[0].info[i] = {"name": name, "age" : age, "city": city};
       }

       console.log(mass);

       axios.post('/save', mass).then(res => {
        this.setState({date2: res.data});
        console.log("Труляля!");
        console.log(res.data);
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
            <button type="button" class="btn btn-primary " id="SubBtn" onClick={this.props.PostData}>Submit</button>
            <button type="button" class="btn btn-success submit" id="LogBtn" onClick={this.SaveAll.bind(this)} >Save all</button>
          </form>
        )
    }    
}

export default Form;