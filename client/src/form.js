import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
          date2: [],
          InputCount : [1],
        }
     }

     changeInp() {
      let InputValue = Math.round(document.getElementsByClassName("myRange")[0].value / 10);
      let Number = document.getElementsByClassName("InputNumber")[0].innerHTML = InputValue;
    }

     createInputs(){
      let InputValue = Math.round(document.getElementsByClassName("myRange")[0].value / 10);
      let mass = [];
      for (var i = 0; i < InputValue; i++) { mass.push(i) };
      this.setState({InputCount: mass});
     }


     createInput() {    
      if(this.state.InputCount.length < 10) {
        this.state.InputCount.push(1);   
        this.setState({InputCount: this.state.InputCount})
      } else {
        alert("Максимальное колличество ячеек 10.")
      }
     }

     delInput(event){

       let id = event.target.parentNode.parentNode.id;

        delete this.state.InputCount[id];
        this.setState({InputCount : this.state.InputCount})
     }

       
     SaveAll(){

       let all_blocks = document.getElementsByClassName('Name_block');
       let login = document.getElementById("Auth_Name_field").innerHTML;

       let mass = [
         {
           "login": login,
           "info": [{"tasks": []}]
        }
       ];

       for (var i = 0; i < all_blocks.length; i++) {
         let name = all_blocks[i].getElementsByClassName("Name_field").length;

         let nwMass = [];

         for (var u = 0; u < name; u++) {
           let Inf = all_blocks[i].getElementsByClassName("Name_field")[u].innerHTML;
           nwMass.push(Inf);
         }

         mass[0].info[0].tasks.push(nwMass);
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
            <p>Колличество записей:<span className="InputNumber">1</span></p>
            <div className="slidecontainer">
                <input type="range"  min="10" max="100" defaultValue="10"  className="slider myRange" onChange={this.changeInp.bind(this)}/>
                <button type="button" className="btn btn-warning" onClick={this.createInputs.bind(this)}>Создать</button>
                <button type="button" className="btn btn-info btn-warning2" onClick={this.createInput.bind(this)}><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button>
            </div>

            {this.state.InputCount.map((item, id) => { return(

            <div id ={id} key={id}>  
            <div className="InputsBox">
            <div className="Inp">
              <input type="text" className="form-control" placeholder="Введите текст" />
            </div>
            <span className="glyphicon glyphicon-minus-sign krest" aria-hidden="true" onClick={this.delInput.bind(this)}></span>
            </div>
            </div>

            )})}

            <button type="button" className="btn btn-primary " id="SubBtn" onClick={this.props.PostData}>Submit</button>
            <button type="button" className="btn btn-success submit" id="LogBtn" onClick={this.SaveAll.bind(this)} >Save all</button>
          </form>
        )
    }    
}

export default Form;