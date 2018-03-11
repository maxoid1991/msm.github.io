import React, { Component } from 'react';
import axios from 'axios';
import { setTimeout } from 'timers';

class DeleteBlock extends Component {

    constructor(props){
        super(props);
        this.state = {
            status: true,
            count: 0
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

        if (this.state.count % 2 == 0) {

         let NM_field = event.target.parentNode.parentNode.getElementsByClassName("Name_field");
         //console.log("Инпуты")
         //console.log(NM_field.length);
                        
            for (var i = 0; i < NM_field.length; i++) {

                //Take innerHTML of Element
                let pHtml = NM_field[i].innerHTML;

                //Create new element - input
                let Inp = document.createElement("input");
                Inp.type = "text";
                Inp.className = "Nme_field";
                Inp.value = pHtml;

                //Add input fields
                event.target.parentNode.parentNode.appendChild(Inp);      
            }
                // Del p fields
                //let p = event.target.parentNode.parentNode.getElementsByTagName("p");


                let DelNodesLen = NM_field.length;

                for (var i = 0; i < DelNodesLen; i++) {
                    event.target.parentNode.parentNode.removeChild(NM_field[0]);
                    //console.log(NM_field.length);
                }


            this.setState({count: this.state.count + 1})
            //console.log(this.state.count);

        } else {
            //Back tag > p function

            let Nme_field = event.target.parentNode.parentNode.getElementsByClassName("Nme_field");

            for(var i = 0; i < Nme_field.length; i++) {
                let val = Nme_field[i].value;
                let p = document.createElement("p");
                p.className = "Name_field";
                p.innerHTML = val;
                event.target.parentNode.parentNode.appendChild(p);
            }

            //Del input

            let DelNodesInpLen = Nme_field.length;
            for (var i = 0; i < DelNodesInpLen; i++) {
                event.target.parentNode.parentNode.removeChild(Nme_field[0]);
            }
            this.setState({count: this.state.count + 1})

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

    render(){
        return(
            <div className="del_block">
            <span class="glyphicon glyphicon-edit" aria-hidden="true" onClick={this.edit.bind(this)}></span>
            <span class="glyphicon glyphicon-chevron-left left-arrow" aria-hidden="true" onClick={this.changePlaceRight.bind(this)}></span>
            <span class="glyphicon glyphicon-chevron-right right-arrow" aria-hidden="true" onClick={this.changePlaceLeft.bind(this)}></span>
            <button type="button" class="close" aria-label="Close" onClick={this.close.bind(this)}>
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        )
    }    
}

export default DeleteBlock;