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
         let chosenBlock = event.target.parentNode.parentNode.parentNode;
         let chosenBlockId = chosenBlock.id;

         let number = {};
         number.numb = chosenBlockId;

         chosenBlock.remove();
     }

//Edit, save block

     edit(event){
         let Items = event.target.parentNode.parentNode.getElementsByClassName("Item");
         let AddItemBlock = event.target.nextSibling;
         let ItemStatus = event.target.parentNode.parentNode.getElementsByClassName("TaskDone");
         let ListName = event.target.parentNode.previousSibling;
         let HideIconListDone = event.target.parentNode;

         let mass = [];

         if(this.state.itemStatus === false) {

            //Hide ListDone Icon

            HideIconListDone.getElementsByClassName("glyphicon glyphicon-check")[0].style.cssText = "position: relative; z-index: -100; opacity: 0";

            //Edit ListName field

            let ListNameText = ListName.innerHTML;
            ListName.remove();
            let ListNameInp = document.createElement("input");
            ListNameInp.className = "Nme_field2 ListNamefield";
            ListNameInp.value = ListNameText;
            event.target.parentNode.parentNode.insertBefore(ListNameInp, event.target.parentNode);

            //Hide Add new Item block

            AddItemBlock.style.cssText = "position: relative; z-index: -100; opacity: 0";

             for (var i = 0; i < Items.length; i++) {
                 
                //Change p > input
                 let items = Items[i].getElementsByClassName("Name_field")[0];
                 mass.push(items.innerHTML);
                 items.remove();
                 let input = document.createElement('input');
                 input.className = "Nme_field";
                 input.value = mass[i];
                 let Tsk = Items[i].getElementsByClassName("TaskDone")[0];
                 Items[i].insertBefore(input, Tsk);

                 //Write item status: Done or not
                 if (ItemStatus[i].innerHTML === "true") {
                     event.target.parentNode.parentNode.getElementsByClassName("Nme_field")[i].style.cssText = "text-decoration:line-through";
                 }
                                
                 // Hide Task Done button
                 Items[i].getElementsByClassName("edit_box")[0].getElementsByClassName("glyphicon-ok-circle")[0].style.cssText = "display: none";
             }

             this.setState({itemStatus : true})
        } else {

            //Show ListDone Icon 

            HideIconListDone.getElementsByClassName("glyphicon glyphicon-check")[0].style.cssText = "position: inherit; z-index: 2; opacity: 1";

            //Edit ListName field

            let ListNameText = ListName.value;
            ListName.remove();
            console.log(ListNameText);

            let ListNameInp = document.createElement("p");
            ListNameInp.className = "Name_field2 ListName";
            ListNameInp.innerHTML = ListNameText;
            event.target.parentNode.parentNode.insertBefore(ListNameInp, event.target.parentNode);

            AddItemBlock.style.cssText = "position: inherit; z-index: 2; opacity: 1";

            for (i = 0; i < Items.length; i++) {
                let items = Items[i].getElementsByClassName("Nme_field")[0];
                mass.push(items.value);
                items.remove();
                let text = document.createElement('p');
                text.className = "Name_field";
                text.innerHTML = mass[i];
                let Tsk = Items[i].getElementsByClassName("TaskDone")[0];
                Items[i].insertBefore(text, Tsk);

                // Hide Add new item block
                Items[i].getElementsByClassName("edit_box")[0].getElementsByClassName("glyphicon-ok-circle")[0].style.cssText = "display: block;"; 
                
                //Write item status: Done or not
                if (ItemStatus[i].innerHTML === "true") {
                    event.target.parentNode.parentNode.getElementsByClassName("Name_field")[i].style.cssText = "text-decoration:line-through; color: grey";
                    event.target.parentNode.parentNode.getElementsByClassName("Item")[i].getElementsByClassName("edit_box")[0].children[2].style.cssText = "color: green";
                }
            }
            this.setState({itemStatus : false})
        }

     }

    //Change place right

    changePlaceRight(event) {
        let currentBox = event.target.parentNode.parentNode;
        let Blocks = document.body.getElementsByClassName("Blocks")[0];
        let nextBox = event.target.parentNode.parentNode.previousSibling;
        Blocks.insertBefore(currentBox, nextBox);
    }

    //Change place left
    changePlaceLeft(event) {
        let currentBox = event.target.parentNode.parentNode.nextSibling;
        let nextBox = event.target.parentNode.parentNode;
        let Blocks = document.body.getElementsByClassName("Blocks")[0];

        if(currentBox) {
            Blocks.insertBefore(currentBox, nextBox);
        } else {
            let currentBox = event.target.parentNode.parentNode;
            Blocks.insertBefore(currentBox, Blocks.children[0]);
        }
    }

    Listdone(event){
        let Item = event.target.parentNode.nextSibling;
        let Status = event.target.parentNode.parentNode.getElementsByClassName("ListStatus")[0].getElementsByClassName("ShowListDone")[0];

        if (Status.innerHTML === "false") {
          Item.style.cssText = "left: 0; transition-duration: .2s";
          Status.innerHTML = "true";
        } else {
            console.log("hi!")
        }
    }


    render(){
        return(
            <div className="del_block">
            <span className="glyphicon glyphicon-edit" aria-hidden="true" onClick={this.edit.bind(this)}></span>
            <span className="glyphicon glyphicon-plus" aria-hidden="true" onClick={this.props.AddItem}></span>
            <span className="glyphicon glyphicon-chevron-left left-arrow" aria-hidden="true" onClick={this.changePlaceRight.bind(this)}></span>
            <span className="glyphicon glyphicon-chevron-right right-arrow" aria-hidden="true" onClick={this.changePlaceLeft.bind(this)}></span>
            <button type="button" className="close" aria-label="Close" onClick={this.close.bind(this)}>
                <span aria-hidden="true">&times;</span>
            </button>
            <span className="glyphicon glyphicon-check" aria-hidden="true" onClick={this.Listdone.bind(this)}></span>
            </div>
        )
    }    
}

export default DeleteBlock;