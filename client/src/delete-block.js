import React, { Component } from 'react';

class DeleteBlock extends Component {

    constructor(props){
        super(props);
        this.state = {
            status: true,
            count: 0,
            itemStatus: false
        }
     }

//Del block 

     close(event){
        let currentBlock = event.target.parentNode.parentNode.parentNode.parentNode;
        currentBlock.remove();
     }

//Edit, save block

     edit(event){


         let Items = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("Task");
         let AddItemBlock = event.target.parentNode.nextSibling;
         let ItemStatus = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("TaskDone");
         let ListName = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("ListName")[0];
         let HideIconListDone = event.target.parentNode.parentNode.nextSibling.nextSibling.children[0];

         let mass = [];

         if(this.state.itemStatus === false) {


            //Hide ListDone Icon

            HideIconListDone.style.cssText = "position: relative; z-index: -100; opacity: 0";

            //Edit ListName field

            let ListNameText = ListName.innerHTML;
            
            ListName.remove();
            let ListNameInp = document.createElement("input");
            ListNameInp.className = "ListName ListName_input";
            ListNameInp.value = ListNameText;
            event.target.parentNode.parentNode.parentNode.parentNode.insertBefore(ListNameInp, event.target.parentNode.parentNode.parentNode);
            event.target.parentNode.parentNode.parentNode.previousSibling.focus();

            //Hide Add new Item block

            AddItemBlock.style.cssText = "position: relative; z-index: -100; opacity: 0";

            for (var i = 0; i < Items.length; i++) {
                 
            //Change p > input
                    let items = Items[i].getElementsByClassName("Task_text")[0];
                    mass.push(items.innerHTML);
                    items.remove();
                    let input = document.createElement('input');
                    input.className = "Task_text Task_text_input";
                    input.value = mass[i];
                    let Tsk = Items[i].getElementsByClassName("TaskDone")[0];
                    Items[i].insertBefore(input, Tsk);

            //Write item status: Done or not

                    if (ItemStatus[i].innerHTML === "true") {
                        event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("Task_text")[i].style.cssText = "text-decoration:line-through; color: grey";
                        Items[i].getElementsByClassName("Buttons_group")[0].children[3].style.cssText = "background: green";
                    }
                                
            // Hide Task Done button
                
                Items[i].getElementsByClassName("Buttons_group")[0].children[3].style.cssText = "display: none";
            }

            this.setState({itemStatus : true})
        } else {

            //Show ListDone Icon 
                
                HideIconListDone.style.cssText = "position: inherit; z-index: 2; opacity: 1";

        //Edit ListName field

        let ListNameText = ListName.value;
        ListName.remove();

        let ListNameInp = document.createElement("p");
        ListNameInp.className = "ListName";
        ListNameInp.innerHTML = ListNameText;
        event.target.parentNode.parentNode.insertBefore(ListNameInp, event.target.parentNode);event.target.parentNode.parentNode.parentNode.parentNode.insertBefore(ListNameInp, event.target.parentNode.parentNode.parentNode);
        
        AddItemBlock.style.cssText = "position: inherit; z-index: 2; opacity: 1";

        for (i = 0; i < Items.length; i++) {
                 let items = Items[i].getElementsByClassName("Task_text")[0];
                 mass.push(items.value);
                 items.remove();
                 let text = document.createElement('p');
                 text.className = "Task_text";
                 text.innerHTML = mass[i];
                 let Tsk = Items[i].getElementsByClassName("TaskDone")[0];
                 Items[i].insertBefore(text, Tsk);

                // Hide Task Done button
                Items[i].getElementsByClassName("Buttons_group")[0].children[3].style.cssText = "display: block";
                
        //Write item status: Done or not
                if (ItemStatus[i].innerHTML === "true") {
                     event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("Task_text")[i].style.cssText = "text-decoration:line-through; color: grey";
                     Items[i].getElementsByClassName("Buttons_group")[0].children[3].style.cssText = "background: green";
                 }
        }
           this.setState({itemStatus : false})
        }

     }

    //Change place right

    changePlaceRight(event) {

        let currentBlock = event.target.parentNode.parentNode.parentNode.parentNode;
        let nextBlock = currentBlock.nextSibling;
        let parentBlock = document.getElementsByClassName("Task_block")[0];

        if (nextBlock !== null) {
            parentBlock.insertBefore(nextBlock, currentBlock);
        } else {
            parentBlock.insertBefore(currentBlock, parentBlock.children[0]);
        }
    }

    //Change place left
    changePlaceLeft(event) {

        let currentBlock = event.target.parentNode.parentNode.parentNode.parentNode;
        let nextBlock = currentBlock.previousSibling;
        let parentBlock = document.getElementsByClassName("Task_block")[0];

        if(nextBlock !== null) {
            parentBlock.insertBefore(currentBlock, nextBlock);
        } else {
            parentBlock.insertBefore(currentBlock, parentBlock.lastChild);
            parentBlock.insertBefore(parentBlock.lastChild, parentBlock.lastChild.previousSibling);

        }
    }

    Listdone(event){

        let Item = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("ListDone")[0];
        let Status = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("ListStatus")[0].getElementsByClassName("ShowListDone")[0];


        if (Status.innerHTML === "false") {
            Item.style.cssText = "left: 50%; transform: translateY(-50%) rotate(0deg); transition-duration: .5s";
            Status.innerHTML = "true";
        } 
    }


    render(){
        return(
            <div className="ListMenu">
            <div className="ListMenu_first">
              <button className="ListMenu_btn"><span class="glyphicon glyphicon-pencil ListMenu_icon" aria-hidden="true" onClick={this.edit.bind(this)}></span></button>
              <button className="ListMenu_btn" onClick={this.props.AddItem}><span class="glyphicon glyphicon-plus ListMenu_icon icon_2" aria-hidden="true"></span></button>
            </div>
            <div className="ListMenu_second">
              <button className="ListMenu_btn" onClick={this.changePlaceLeft.bind(this)}><span class="glyphicon glyphicon-chevron-left ListMenu_icon icon_3" aria-hidden="true"></span></button>
              <button className="ListMenu_btn" onClick={this.changePlaceRight.bind(this)}><span class="glyphicon glyphicon-chevron-right ListMenu_icon" aria-hidden="true"></span></button>
            </div>
            <div className="ListMenu_third">
              <button className="ListMenu_btn" onClick={this.Listdone.bind(this)}><span class="glyphicon glyphicon-ok ListMenu_icon  Listdone_icon" aria-hidden="true"></span></button>
              <button className="ListMenu_btn" onClick={this.close.bind(this)}><span class="glyphicon glyphicon-remove ListMenu_icon icon_close" aria-hidden="true"></span></button>
            </div>
            <div className="ListPult_bg"></div>     
          </div>
        )
    }    
}

export default DeleteBlock;