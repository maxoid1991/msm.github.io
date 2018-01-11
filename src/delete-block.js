import React, { Component } from 'react';
import axios from 'axios';

class DeleteBlock extends Component {

    constructor(props){
        super(props);
     }

     close(event){
         let chosenBlock = event.target.parentNode.parentNode.parentNode;
         let chosenBlockId = chosenBlock.id;

         let number = {};
         number.numb = chosenBlockId;

         chosenBlock.remove();
     }

    render(){
        return(
            <div className="del_block">
            <button type="button" class="close" aria-label="Close" onClick={this.close.bind(this)}>
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        )
    }    
}

export default DeleteBlock;