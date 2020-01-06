import React, { Component } from "react"
import { MdDelete } from 'react-icons/md';


class Item extends Component {
  
    render() {
        const { id, content, handleRemove  } = this.props;
        
        return (
            <div className='item'>
                <div className='item__content'>{content}</div>
                <div className='item__buttons'>                    
                    <MdDelete onClick={() => handleRemove(id)} className='item__buttons__btn' />
                </div>
            </div>);
    }
}

export default Item;