import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';
import DelBlock from './delete-block';
import AuthFront from './auth_front';

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

    for (var i = 0; i < ListDone.length; i ++) {

      //ListStatus
      
      let ListStatus = document.getElementsByClassName("Name_block")[i].getElementsByClassName("ListStatus")[0].children[1];

      if (ListDone[i].ListStatus === "true") {
        let ListStyles = document.getElementsByClassName("Name_block")[i].getElementsByClassName("ListDone")[0].style.cssText = "left: 0; transition-duration: .2s";
      } else {
        let ListStyles = document.getElementsByClassName("Name_block")[i].getElementsByClassName("ListDone")[0].style.cssText = "left: -300%; transition-duration: .2s";
      }

      //ItemsStatus

      let Items = document.getElementsByClassName("Name_block")[i].getElementsByClassName("Item");
      
      for (var u = 0; u < Items.length; u++) {
        if (ListDone[i].ItemsStatus[u] === "true") {
          let ItemsStatus = document.getElementsByClassName("Name_block")[i].getElementsByClassName("Item")[u];
          ItemsStatus.getElementsByClassName("Name_field")[0].style.cssText = "text-decoration: line-through; color: grey;";
          ItemsStatus.getElementsByClassName("TaskDone")[0].innerHTML = "true";
          ItemsStatus.getElementsByClassName("edit_box")[0].children[2].style.cssText = "color: green";
        } 
      }
    }
  }

//Upload data from server

componentWillMount () {


  axios.get(port + "/").then(res => {


  let updInfo = () => {
    document.body.getElementsByClassName("auth_Name")[0].style.cssText = "display: block";
    document.body.getElementsByClassName("AuthButtons")[0].style.cssText = "display: none";
    document.getElementById("Auth_Name_field").innerHTML = res.data[0].login;
    document.getElementById("LogBtn").style.cssText = "display: block";
  }


  //This part re-write;

    if (res.data[1] > 0) {
      this.setState({data: res.data});
      updInfo();
      this.SetStyles();
      document.getElementById("LogBtn").style.cssText = "opacity: 1; left: 0; z-index: 1";
  
    } else {
      this.setState({data: res.data});
      document.getElementById("LogBtn").style.cssText = "opacity: 0; left: -110px; z-index: -1";
    }
  })

}


PostData() {
  let ListName = document.getElementsByClassName("Inp2")[0].children[0];
  let InputText = document.getElementsByClassName("Inp");

  let NewList = {
    ListName: "",
    Items: []
  };

  if (ListName.value !== "") {
    NewList.ListName = ListName.value;
  } else {
    alert("Введите название листа!")
  }

  for (var i = 0; i < InputText.length; i++) {
    let val = InputText[i].children[0].value;

    if(val !== "") {
      NewList.Items.push(val);
    }
  }

  //Validation

  if(NewList.Items.length === 0) {
    alert("Введите хотя бы одну задачу!")
  } else {
    ListName.value = "";
    for (i = 0; i < InputText.length; i++) {
      InputText[i].children[0].value = "";
    }
  }

  //Add New Data

  if(NewList.ListName !== "" && NewList.Items.length !== 0){
      this.state.data[0].info = [...this.state.data[0].info, NewList];
      this.setState({dataTasks: true});
  }
}


//Send registration data to server

logInData(){
  let EmailLogin = document.getElementById("LogInEmail").value;
  let Pass = document.getElementById("LogInPass").value;
  let EmPass = [];
  EmPass.push(EmailLogin);
  EmPass.push(Pass);

  axios.post(port + '/auth_login', EmPass).then(res => {

      if(typeof res.data === "string") {
        alert(res.data);
      } else {
        this.setState({data: [res.data]});
        this.SetStyles();

        //Clear Auth form and hide it

        document.getElementById("LogInEmail").value = "";
        document.getElementById("LogInPass").value = "";
        document.getElementsByClassName("twoForms")[0].style.cssText = "margin: -320px auto 0; height: 330px;"
        document.getElementsByClassName("LogInField")[0].style.cssText = "top: -320px; opacity: 0";
        document.getElementsByClassName("RegistrationField")[0].style.cssText = "top: -320px; opacity: 1";

        document.getElementsByClassName("auth_Name")[0].style.cssText = "display: block";
        document.getElementsByClassName("AuthButtons")[0].style.cssText = "display: none";

        document.getElementById("Auth_Name_field").innerHTML = this.state.data[0].login;
        document.getElementById("LogBtn").style.cssText = "opacity: 1; left: 0; z-index: 1";

      }

  })

}

//Show list items menu

showMenu(event) {

  let Item = event.target.parentNode.getElementsByClassName("ShowItemMenu")[0];
  
  let menuBtn = event.target.nextSibling;

  if (Item.innerHTML === "false") {
    menuBtn.style.cssText = "width: 85px; transition-duration: .3s";
    Item.innerHTML = "true";
  } else {
    menuBtn.style.cssText = "width: 0px; transition-duration: .3s";
    Item.innerHTML = "false";
  }

}

//List item down

ListItemDown (event) {
  let ItemNext = event.target.parentNode.parentNode;
  let Box = event.target.parentNode.parentNode.parentNode;

  if(ItemNext.nextSibling.className === "Item") {
    Box.insertBefore(ItemNext.nextSibling, ItemNext);
  } else {
    Box.insertBefore(ItemNext, Box.children[4]);
  }
}

//List item up

ListItemUp (event) {

  let Item = event.target.parentNode.parentNode.parentNode;
  let ItemBox = event.target.parentNode.parentNode;

  if (ItemBox.previousSibling.className === "Item") {
    Item.insertBefore(ItemBox, ItemBox.previousSibling);
  } else {
    Item.insertBefore(ItemBox, Item.lastChild.previousSibling);
  }
}

//Del list item

RemoveItem(event){
  let Item = event.target.parentNode.parentNode;
  Item.parentNode.removeChild(Item);
}

//Task have done

ItemTaskDone(event){
  
  let ItemClick = event.target.parentNode.parentNode.getElementsByClassName("TaskDone")[0];
  
  let Item = event.target.parentNode.nextSibling;

  if (ItemClick.innerHTML === "false") {
    Item.style.cssText = "text-decoration: line-through; color: grey";
    event.target.style.cssText = "color: green";
    ItemClick.innerHTML = "true";
} else {
    Item.style.cssText = "text-decoration: none; color: black";
    event.target.style.cssText = "color: lightgrey";
    ItemClick.innerHTML = "false";
}



}

//Add Item in List

AddItem(event) {

  let status = event.target.parentNode.parentNode.getElementsByClassName("ListStatus")[0].getElementsByClassName("ShowItemInput")[0];
  let Show = event.target.parentNode.parentNode.getElementsByClassName("AddItemBox")[0];
  let changeSpan = event.target;


  if (status.innerHTML === "false") {
    Show.style.cssText = "display: block";
    status.innerHTML = "true";
    changeSpan.className = "glyphicon glyphicon-minus";
  } else {
    Show.style.cssText = "display: none";
    status.innerHTML = "false";
    changeSpan.className = "glyphicon glyphicon-plus";
  }

}

AddFromInput(event) {
  let TextInput = event.target.previousSibling;

  let NumBlock = event.target.parentNode.parentNode.children[0].id;

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
      
      <div className="App" id="App">

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

      </div>


    </div>
    );
  }
}

export default App;
