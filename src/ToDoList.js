import React, { Component } from "react";
import Item from './Item'
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import "./style.scss";

class ToDoList extends Component {
  state = {
    items: [],
    text: ''
  }

  handleInput = e => {
    const { value } = e.target;
    this.setState({
      text: value,

    })

  }

 

  getDate = () => {
    axios.get(`http://localhost:3001/date`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
  }
  addDate = () => {
    const { text } = this.state;
    axios.get(`http://localhost:3001/add?content=${text}`)
      .then(res => {
        console.log('dodano item')
      })
    this.setState({
      text: '',
    })

  }

  removeDate = (id) => {
    axios.get(`http://localhost:3001/remove?id=${id}`)
      .then(res => {
        console.log('usunieto item')
      })
  }


  componentDidMount = () => {
    this.getDate()
  }
  componentDidUpdate = () => {
    this.getDate()
  }

  render() {
    const { items, text } = this.state;
    const itemScreen = items.map(element => {
      const { id, content } = element;
      return <Item key={id} id={id} content={content} handleRemove={this.removeDate}  />
    })
    return (
      <div className="list">
        <div className="list__title">
          to do list
        </div>
        <div className="list__items">
          {items.length ? itemScreen : <div>Lista jest pusta</div>}
          <input onChange={this.handleInput} value={text} style={{
            padding: '1vw',
            borderRadius: '5px',
            border: 'none',
            margin: '2vw'
          }} />
          <FaPlus onClick={() => this.addDate()} className="list__items__add" />
        </div>
      </div>);
  }
}

export default ToDoList;
