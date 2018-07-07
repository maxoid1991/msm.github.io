import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';
import DelBlock from './delete-block';
import AuthFront from './auth_front';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

let port ='http://localhost:5000';

class App extends Component {

constructor(props){
  super(props);
  this.state = {
    dataTasks: false,
    dataD: [],
    data: []
  }
}

  //Function set styles after downloading data

  SetStyles () {

    let ListDone = this.state.data[0].info;

    console.log(this.state.data[0]);

    //ListStatus

    for (var i = 0; i < ListDone.length; i ++) {
      let ListStatus = document.getElementsByClassName("List")[i].getElementsByClassName("ListStatus")[0].children[1];

      if (ListDone[i].ListStatus === "true") {
        document.getElementsByClassName("List")[i].getElementsByClassName("ListDone")[0].style.cssText = "left: 50%; transform: translateY(-50%) rotate(0deg); transition-duration: 0.5s";
        ListStatus.innerHTML = "true";
      } else {
        document.getElementsByClassName("List")[i].getElementsByClassName("ListDone")[0].style.cssText = "left: - 300%; transition-duration: .4s";
        ListStatus.innerHTML = "false";
      }



      let Items = document.getElementsByClassName("List")[i].getElementsByClassName("Task");

      for (var u = 0; u < Items.length; u++) {
        if (ListDone[i].ItemsStatus[u] === "true") {
         let ItemsStatus = document.getElementsByClassName("List")[i].getElementsByClassName("Task")[u];
         ItemsStatus.getElementsByClassName("Task_text")[0].style.cssText = "text-decoration: line-through; color: grey;";
         ItemsStatus.getElementsByClassName("TaskDone")[0].innerHTML = "true";
         ItemsStatus.getElementsByClassName("Buttons_group")[0].children[3].children[0].style.cssText = "border: solid white 1px";
        }
       }

    }

  }

//Write in LogInField key and pass from LocalStorage

LocalSt(){
  let SavedLoginPass = JSON.parse(window.localStorage.getItem("myKey"));
  if(SavedLoginPass !== null) {
    document.getElementsByClassName("Auth_login")[0].value = SavedLoginPass[0];
    document.getElementsByClassName("Auth_pass")[0].value = SavedLoginPass[1];
  }
}

//Upload data from server

componentWillMount () {


  axios.get(port + "/").then(res => {


let updInfo = () => {
  document.getElementsByClassName("Registration LogIn")[0].style.cssText = "display: block";
  document.getElementsByClassName("Save_btn")[0].style.cssText = "display: block";
  document.getElementsByClassName("Registration")[0].style.cssText = "display: none";
  document.getElementsByClassName("Login_Name")[0].innerHTML = this.state.data[0].login;
}


  //This part re-write;

    if (res.data[1] > 0) {
      this.setState({data: res.data});
      updInfo();
      this.SetStyles();
      this.LocalSt();
  
    } else {
      this.setState({data: res.data});
      this.SetStyles();
      this.LocalSt();
    }
  })

}


PostData() {
  let ListName = document.getElementsByClassName("Cntrl")[0];
  let InputText = document.getElementsByClassName("Controller_Task_InpDiv");

  let NewList = {
    ListName: "",
    Items: []
  };


  if (ListName.value !== "") {
    NewList.ListName = ListName.value;
  } else {
    alert("Введите название листа!");
  }


  for(var i = 0; i < InputText.length; i++) {
    let val = InputText[i].children[0].value;

    if(val !== "") {
      NewList.Items.push(val);
    }
  }

  if(NewList.Items.length === 0) {
       alert("Введите хотя бы одну задачу!")
     } else {
       ListName.value = "";
       for (i = 0; i < InputText.length; i++) {
         InputText[i].children[0].value = "";
       }
     }

     if(NewList.ListName !== "" && NewList.Items.length !== 0){
           this.state.data[0].info = [...this.state.data[0].info, NewList];
           this.setState({dataTasks: true});
       }
}


//Send registration data to server

logInData(){

  let Email = document.getElementsByClassName("Auth_login")[0];
  let Pass = document.getElementsByClassName("Auth_pass")[0];
  let Mass = [];


  if(Email.value !== "" && Pass.value !== "") {
    Mass.push(Email.value, Pass.value);

    //Save login and pass on localStorage;

    let SavedLoginPass = JSON.parse(window.localStorage.getItem("myKey"));
    
    if(SavedLoginPass === null) {
      let saveLoginPass = window.confirm("Сохранить логин и пароль?");

      if(saveLoginPass === true) {
        var LocalSt = JSON.stringify(Mass);
        localStorage.setItem("myKey", LocalSt);
      }
    }


    axios.post(port + '/auth_login', Mass).then(res =>{
      if(typeof res.data === "string") {
        alert(res.data);
      } else {
        this.setState({data: [res.data]});

        //Clear values

        Email.value = "";
        Pass.value = "";

        //Clear Inputs and Hide

        let Auth_block = document.getElementsByClassName("Auth_block")[0];
        Auth_block.style.cssText = "display: none";

        //Hide Auth block & show after auth block

        document.getElementsByClassName("Registration")[0].style.cssText = "display: none";
        document.getElementsByClassName("Registration LogIn")[0].style.cssText = "display: block";
        document.getElementsByClassName("Save_btn")[0].style.cssText = "display: block";
        this.SetStyles();

        //Update login

        document.getElementsByClassName("Login_Name")[0].innerHTML = this.state.data[0].login;
      }
    });
  } else {
    alert("Введите логин и пароль");
  }
}

//Show list items menu

showMenu(event) {

  let Item = event.target.parentNode.parentNode;
  let Status = event.target.parentNode.parentNode.parentNode.getElementsByClassName("ShowItemMenu")[0];

  if(Status.innerHTML === "false") {
    Item.style.cssText = "width: 151px; transition-duration: .3s";
    Status.innerHTML = "true";
  } else {
    Item.style.cssText = "width: 33px; transition-duration: .3s";
    Status.innerHTML = "false";
  }

}

//List item down

ListItemDown (event) {

  let currentItem = event.target.parentNode.parentNode.parentNode;
  let ParentNode = currentItem.parentNode;

  if (currentItem.nextSibling.className === "Task") {
    ParentNode.insertBefore(currentItem.nextSibling, currentItem);
  } else {
    ParentNode.insertBefore(currentItem, ParentNode.children[4]);
  }

}

//List item up

ListItemUp (event) {

  let currentItem = event.target.parentNode.parentNode.parentNode;
  let ParentNode = currentItem.parentNode;
  let ListSt = ParentNode.getElementsByClassName("ListStatus")[0];

  if (currentItem.previousSibling.className === "Task") {
    ParentNode.insertBefore(currentItem, currentItem.previousSibling);
  } else {
    ParentNode.insertBefore(currentItem, ListSt);
  }

}

//Del list item

RemoveItem(event){
  let Item = event.target.parentNode.parentNode.parentNode;
  Item.remove();
}

//Task have done

ItemTaskDone(event){

  let Status = event.target.parentNode.parentNode.parentNode.getElementsByClassName("TaskDone")[0];
  let Item = event.target.parentNode.parentNode.nextSibling;

  if(Status.innerHTML === "false"){
    Item.style.cssText = "text-decoration: line-through; color: grey";
    event.target.style.cssText = "border: solid 1px white";
    Status.innerHTML = "true";
  } else {
    Item.style.cssText = "text-decoration: none; color: black";
    event.target.style.cssText = "border: solid 1px transparent";
    Status.innerHTML = "false";

  }

}

//Add Item in List

AddItem(event) {


  let status = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("ShowItemInput")[0];
  let Show = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("AddNew_Task")[0];
  let changeSpan = event.target;


  if (status.innerHTML === "false") {
    Show.style.cssText = "display: block";
    status.innerHTML = "true";
    changeSpan.className = "glyphicon glyphicon-minus ListMenu_icon";
  } else {
    Show.style.cssText = "display: none";
    status.innerHTML = "false";
    changeSpan.className = "glyphicon glyphicon-plus ListMenu_icon icon_2";
  }

}

AddFromInput(event) {


  let TextInput = event.target.parentNode.previousSibling;

  let NumBlock = event.target.parentNode.parentNode.parentNode.children[0].id;

  if (TextInput.value !== "") {
      this.state.data[0].info[NumBlock].Items = [...this.state.data[0].info[NumBlock].Items, TextInput.value];

      this.setState({dataTasks: true}); //wtf?
       TextInput.value = "";

      } else {
        alert("Введите текст!")
      }
}

TaskDoneRemove(event) {
  let Item = event.target.parentNode.style.cssText = "left: - 300%; transition-duration: .4s";
  let Status = event.target.parentNode.parentNode.getElementsByClassName("ListStatus")[0].getElementsByClassName("ShowListDone")[0];
  Status.innerHTML = "false";
}


  render() {

    //Very usefull thing: delay render method before api data came;

    if (!this.state.data.length) {return null};

    return (
      
      <div className="col-md-12 col-sm-12 App" id="App">

      <AuthFront logInData={this.logInData.bind(this)} />

      <header className="col-md-12 col-sm-12 col-xs-12">
        <div className="header_inside">
          <p className="AppName">Task <span>App</span></p>
          <p className="MadeBY">Разработка & дизайн <span>Максим Кикеня</span></p>
        </div>
      </header>

     
      {/* <nav className="Controller col-md-3 col-sm-4">
      
      <div className="Registration">
          <button className="Registration_btn_1">Регистрация</button>
          <button className="Registration_btn_1 Registration_btn_2">Войти</button>
      </div>

      <div className="Controller_Inputs">
        <input type= "text" className="Controller_Inputs_ListName" placeholder="Введите название листа" />
        <div className="Range">
          <input type="range" min="10" max="100" defaultValue="10" className="Controller_Inputs_Range" />
        </div>
        
        <div>
          <button className="Registration_btn_1 Controller_Inputs_create">Создать</button>
          <button className="Registration_btn_1 Registration_btn_2 Controller_Inputs_plus"><span className="RangePlus">+</span></button>
        </div>
        
        <div className="Controller_Task">
          <div className="Controller_Task_InpDiv">
            <input type= "text" className="Controller_Inputs_ListName Controller_Inputs_ListName_Task" placeholder="Задача" />
          </div> 
          <button className="Cntr_minus"><span className="Controller_Task_plus_span">-</span></button>    
        </div>

        <div className="Controller_Task">
          <div className="Controller_Task_InpDiv">
            <input type= "text" className="Controller_Inputs_ListName Controller_Inputs_ListName_Task" placeholder="Задача" />
          </div> 
          <button className="Cntr_minus"><span className="Controller_Task_plus_span">-</span></button>    
        </div>

        <div className="Empty_space"></div>

        
        <div className="Controller_Inputs_bg"></div> 
      </div>


      <div className="AddSave">
          <button className="Registration_btn_1 AddSave_btn">Добавить</button>
          <button className="Registration_btn_1 Registration_btn_2 AddSave_btn">Сохранить</button>
          <div className="Registration_bg AddSave_bg"></div>
      </div>

      </nav> */}

      {/*With React*/}

      <Form PostData={this.PostData.bind(this)}/>

      <div className="Task_block">

      {this.state.data[0].info.map((item, id) => {return(
        <section id={id} key={id} className="List col-md-3 col-sm-4">
          <span id = {id}></span>
          <p className="ListName">{item.ListName}</p>
          <DelBlock AddItem = {this.AddItem.bind(this)} ref="a"/>

          <div className="ListDone">
            <span className="glyphicon glyphicon-ok ListDoneText" aria-hidden="true" onClick={this.TaskDoneRemove.bind(this)}></span>
          </div>
        
       
          {item.Items.map((item, id)=>{return(
            <div className="Task">
              <div className="Buttons_group">
                <button className="ListMenu_btn Task_buttons" onClick={this.showMenu.bind(this)}><span class="glyphicon glyphicon-align-justify ListMenu_icon icon_menu_task" aria-hidden="true"></span></button>
                <button className="ListMenu_btn Task_buttons" onClick={this.ListItemDown.bind(this)}><span class="glyphicon glyphicon-chevron-down ListMenu_icon icon_2" aria-hidden="true"></span></button>
                <button className="ListMenu_btn Task_buttons" onClick={this.ListItemUp.bind(this)}><span class="glyphicon glyphicon-chevron-up ListMenu_icon icon_2" aria-hidden="true"></span></button>
                <button className="ListMenu_btn Task_buttons" onClick={this.ItemTaskDone.bind(this)}><span class="glyphicon glyphicon-ok ListMenu_icon icon_4" aria-hidden="true"></span></button>
                <button className="ListMenu_btn Task_buttons" onClick={this.RemoveItem.bind(this)}><span class="glyphicon glyphicon glyphicon-remove ListMenu_icon" aria-hidden="true"></span></button>
              </div>
              <p key={id} className="Task_text">{item}</p>
                <span className="TaskDone">false</span>
                <span className="ShowItemMenu">false</span>
              </div>            
          )})}
          <div className="ListStatus">
            <span className="ItemsListDone">false</span>
            <span className="ShowListDone">false</span>
            <span className="ShowItemInput">false</span>
        </div>
          <div className="AddNew_Task">
            <input type= "text" className=" Controller_Inputs_ListName AddNew_Task_inp" placeholder="Новая запись" />
            <button className="Registration_btn_1 Registration_btn_2 Controller_Inputs_plus AddNew_Task_btn" onClick={this.AddFromInput.bind(this)}><span className="RangePlus">+</span></button>            
          </div>
        </section>

      )})}
      </div>







      {/*Empty html*/}

      {/* <section className="List col-md-3 col-sm-4">
        <p className="ListName">Название листа</p>
        <div className="ListMenu">
          <div className="ListMenu_first">
            <button className="ListMenu_btn"><span class="glyphicon glyphicon-pencil ListMenu_icon" aria-hidden="true"></span></button>
            <button className="ListMenu_btn"><span class="glyphicon glyphicon-plus ListMenu_icon icon_2" aria-hidden="true"></span></button>
          </div>
          <div className="ListMenu_second">
            <button className="ListMenu_btn"><span class="glyphicon glyphicon-chevron-left ListMenu_icon icon_2" aria-hidden="true"></span></button>
            <button className="ListMenu_btn"><span class="glyphicon glyphicon-chevron-right ListMenu_icon icon_4" aria-hidden="true"></span></button>
          </div>
          <div className="ListMenu_third">
            <button className="ListMenu_btn"><span class="glyphicon glyphicon-ok ListMenu_icon icon_4" aria-hidden="true"></span></button>
            <button className="ListMenu_btn"><span class="glyphicon glyphicon-remove ListMenu_icon icon_4" aria-hidden="true"></span></button>
          </div>
          <div className="ListPult_bg"></div>     
        </div>
        
        <div className="Task">
          <div className="Buttons_group">
            <button className="ListMenu_btn Task_buttons"><span class="glyphicon glyphicon-align-justify ListMenu_icon icon_4" aria-hidden="true"></span></button>
            <button className="ListMenu_btn Task_buttons"><span class="glyphicon glyphicon-chevron-down ListMenu_icon icon_2" aria-hidden="true"></span></button>
            <button className="ListMenu_btn Task_buttons"><span class="glyphicon glyphicon-chevron-up ListMenu_icon icon_2" aria-hidden="true"></span></button>
            <button className="ListMenu_btn Task_buttons"><span class="glyphicon glyphicon-ok ListMenu_icon icon_4" aria-hidden="true"></span></button>
            <button className="ListMenu_btn Task_buttons"><span class="glyphicon glyphicon glyphicon-remove ListMenu_icon" aria-hidden="true"></span></button>
         </div>
         <p className="Task_text">Моя запись номер 1</p>
        </div>

        <div className="AddNew_Task">
          <input type= "text" className=" Controller_Inputs_ListName AddNew_Task_inp" placeholder="Новая запись" />
          <button className="Registration_btn_1 Registration_btn_2 Controller_Inputs_plus AddNew_Task_btn"><span className="RangePlus">+</span></button>
        
        </div>
      
      </section> */}




        {/*Old design*/}
        
        {/* <div className="Auth_sample">
          <div className="alert alert-light " role="alert">
            Тестовые логин: <span className="alert-link">kim</span>, пароль: <span className="alert-link">kim91</span>. <a href="https://vk.com/maxless" target="_blank" className="alert-link"> Написать <span class="glyphicon glyphicon-hand-left" aria-hidden="true"></span></a> 
          </div>
        </div>

      <AuthFront logInData={this.logInData.bind(this)} />
      
      <Form PostData={this.PostData.bind(this)}/>

      <div className="Blocks">

      {this.state.data[0].info.map((item, id) => {return(
        <div id={id} key={id} className='Name_block col-md-3 col-xs-12 col-sm-4'>
        <span id = {id}></span>

        <p key={id} className='Name_field2 ListName'>{item.ListName}</p>

        <DelBlock AddItem = {this.AddItem.bind(this)} ref="a"/>
        <div className="ListDone">
            <span className="glyphicon glyphicon-ok ListDoneText" aria-hidden="true" onClick={this.TaskDoneRemove.bind(this)}></span>
        </div>

        {item.Items.map((item, id)=>{return(
          <div key={id} className="Item">
            <span className="glyphicon glyphicon glyphicon-menu-hamburger" aria-hidden="true" onClick={this.showMenu.bind(this)}></span>
              <div className="edit_box">
                <span className="glyphicon glyphicon-circle-arrow-down" aria-hidden="true" onClick={this.ListItemDown.bind(this)} ></span>
                <span className="glyphicon glyphicon-circle-arrow-up" aria-hidden="true" onClick={this.ListItemUp.bind(this)}></span>
                <span className="glyphicon glyphicon glyphicon-ok-circle" aria-hidden="true" onClick={this.ItemTaskDone.bind(this)}></span>
                <span className="glyphicon glyphicon glyphicon-remove-circle" aria-hidden="true" onClick={this.RemoveItem.bind(this)}></span>
              </div>
              <p key={id} className='Name_field'>{item}</p>
                <span className="TaskDone">false</span>
                <span className="ShowItemMenu">false</span>
           </div>
        )})}

        <div className="ListStatus">
          <span className="ItemsListDone">false</span>
          <span className="ShowListDone">false</span>
          <span className="ShowItemInput">false</span>
        </div>


        <div className="AddItemBox">
            <input className="form-control ItemsAddField" placeholder="Введите новую задачу" type="text"/>
            <button type="button" className="AddItemButton" onClick={this.AddFromInput.bind(this)}>
              <span className="glyphicon glyphicon-plus-sign plusItem"  aria-hidden="true"></span>
            </button>
        </div>
        
        </div>
      )})}

      </div> */}


    </div>
    );
  }
}

export default App;
