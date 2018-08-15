import React, { Component } from 'react';
import axios from 'axios';

let port ='https://pure-earth-94858.herokuapp.com';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
          date2: [],
          InputCount : [1,1],
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

      let mass = [{
        login: undefined,
        info: []
      }];

      let ListItemsCont = document.getElementsByClassName("List");
      let Login = document.getElementsByClassName("Login_Name")[0].innerHTML;


      mass[0].login = Login;

      for (var i = 0; i < ListItemsCont.length; i++) {
        let ListName = ListItemsCont[i].getElementsByClassName("ListName")[0].innerHTML;
        let ListStatus = ListItemsCont[i].getElementsByClassName("ShowListDone")[0].innerHTML;
        let ItemStatus = ListItemsCont[i].getElementsByClassName("Task");

        mass[0].info[i] = {};
        mass[0].info[i].Items = [];
        mass[0].info[i].ItemsStatus = [];
        mass[0].info[i].ListStatus = ListStatus;
        mass[0].info[i].ListName = ListName;
        mass[0].login = Login;


          for (var u = 0; u < ItemStatus.length; u++) {
            mass[0].info[i].Items.push(ItemStatus[u].getElementsByClassName("Task_text")[0].innerHTML);
            mass[0].info[i].ItemsStatus.push(ItemStatus[u].getElementsByClassName("TaskDone")[0].innerHTML);
       }
    }

      axios.post(port + '/save', mass).then(res => {
        alert(res.data);
      });




      //  let mass = [{
      //    login: undefined,
      //    info: []
      //  }];

      //  let ListItemsCont = document.getElementsByClassName("Name_block");
      //  let Login = document.getElementById("Auth_Name_field").innerHTML;

      //  mass[0].login = Login;

      //  for (var i = 0; i < ListItemsCont.length; i++) {
         
      //   //Get List Name and List Status and login
      //    let Name = ListItemsCont[i].getElementsByClassName("ListName")[0].innerHTML;
      //    let ListStatus = ListItemsCont[i].getElementsByClassName("ShowListDone")[0].innerHTML;

      //   //Get Items Text and Items Status
      //   let ItemStatus = ListItemsCont[i].getElementsByClassName("Item");

      //   mass[0].info[i] = {};
      //   mass[0].info[i].Items = [];
      //   mass[0].info[i].ItemsStatus = [];
      //   mass[0].info[i].ListStatus = ListStatus;
      //   mass[0].info[i].ListName = Name;
      //   mass[0].login = Login;

      //   for (var u = 0; u < ItemStatus.length; u++) {
      //     mass[0].info[i].Items.push(ItemStatus[u].getElementsByClassName("Name_field")[0].innerHTML);
      //     mass[0].info[i].ItemsStatus.push(ItemStatus[u].getElementsByClassName("TaskDone")[0].innerHTML);
      //   }
   
      //  }

      //  axios.post(port + '/save', mass).then(res => {
      //    console.log("Вернулся ответ с сервера!");
      //  });

      //  console.log(mass);
     }

     showLogIn(){
       let Auth_block2 = document.getElementsByClassName("Registration_block")[1];
       Auth_block2.style.cssText = "display: none";
       let Auth_block = document.getElementsByClassName("Auth_block")[0];
       Auth_block.style.cssText = "display: block";
       
       let LocalSt = window.localStorage.getItem("myKeyLS");
       
       if(!LocalSt) {} else {
         document.getElementsByClassName("Auth_login")[0].value = JSON.parse(LocalSt)[0];
         document.getElementsByClassName("Auth_pass")[0].value = JSON.parse(LocalSt)[1];
       }
     }

     showReg() {
      let Auth_block2 = document.getElementsByClassName("Auth_block")[0];
      Auth_block2.style.cssText = "display: none";
      let Auth_block = document.getElementsByClassName("Registration_block")[1];
      Auth_block.style.cssText = "display: block";
     }

     //LogOut function

     LogOut(){
      let SessSt = window.sessionStorage.removeItem("myKey");
      window.location.href = window.location.href;

      let LocalSt = window.localStorage.getItem("myKey");
      
      if(!LocalSt) {} else {
        window.localStorage.setItem("myKeyLS", LocalSt);
        window.localStorage.removeItem("myKey");
        window.location.href = window.location.href;
      }
  }

    render(){
        return(

          <nav className="Controller col-md-3 col-sm-4">
      
          <div className="Registration">
              <button className="Registration_btn_1" onClick={this.showReg.bind(this)}>Регистрация</button>
              <button className="Registration_btn_1 Registration_btn_2" onClick={this.showLogIn.bind(this)}>Войти</button>
          </div>

          <div className="Registration LogIn">
            <p className="Reg_name">Hi, <span className="Login_Name">Василий Петров</span>.</p>
            <button className="Registration_btn_1 Registration_btn_2 LogOut" onClick={this.LogOut.bind(this)}>Выйти</button>
          </div>
    
          <div className="Controller_Inputs">
            <input type= "text" className="Controller_Inputs_ListName Cntrl" placeholder="Введите название листа" />
            <div className="Range">
              <input type="range" min="10" max="100" defaultValue="10" className="Controller_Inputs_Range myRange"/>
            </div>
            
            <div>
              <button className="Registration_btn_1 Controller_Inputs_create myRange" onClick={this.createInputs.bind(this)}>Создать</button>
            </div>

            {this.state.InputCount.map((item, id) => { return(
              <div id={id} className="Controller_Task">
                <div className="Controller_Task_InpDiv">
                  <input type= "text" className="Controller_Inputs_ListName Controller_Inputs_ListName_Task" placeholder="Задача" />
                </div> 
                <div className="Cntr_minus"><span className= "Controller_Task_plus_span" onClick={this.delInput.bind(this)}>−</span></div>    
             </div>
            )})}
            

            <div className="Empty_space"></div>
    
            
            <div className="Controller_Inputs_bg"></div> 
          </div>
    
    
          <div className="AddSave">
              <button className="Registration_btn_1 AddSave_btn" onClick={this.props.PostData}>Добавить</button>
              <button className="Registration_btn_1 Registration_btn_2 AddSave_btn Save_btn" onClick={this.SaveAll.bind(this)}>Сохранить</button>
              <div className="Registration_bg AddSave_bg"></div>
          </div>
    
          </nav>



          //   <form className="col-sm-2">
          //   <p>Название листа:</p>
          //   <div className="Inp2">
          //     <input type="text" className="form-control" placeholder="Введите название" />
          //   </div>
          //   <p>Колличество записей:<span className="InputNumber">1</span></p>
          //   <div className="slidecontainer">
          //       <input type="range"  min="10" max="100" defaultValue="10"  className="slider myRange" onChange={this.changeInp.bind(this)}/>
          //       <button type="button" className="btn btn-warning" onClick={this.createInputs.bind(this)}>Создать</button>
          //       <button type="button" className="btn btn-info btn-warning2" onClick={this.createInput.bind(this)}><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button>
          //   </div>

          //   {this.state.InputCount.map((item, id) => { return(

          //   <div id ={id} key={id}>  
          //   <div className="InputsBox">
          //   <div className="Inp">
          //     <input type="text" className="form-control" placeholder="Введите задачу" />
          //   </div>
          //   <span className="glyphicon glyphicon-minus-sign krest" aria-hidden="true" onClick={this.delInput.bind(this)}></span>
          //   </div>
          //   </div>

          //   )})}

          //   <button type="button" className="btn btn-primary " id="SubBtn" onClick={this.props.PostData}>Submit</button>
          //   <button type="button" className="btn btn-success submit" id="LogBtn" onClick={this.SaveAll.bind(this)} >Save all</button>
          // </form>
        )
    }    
}

export default Form;