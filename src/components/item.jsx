import React from "react"
import { Component } from "react"

export default class Item extends Component {
  render() {
    return (
      <li>
        <label>
          <input 
            type="checkbox" 
            defaultChecked={this.props.done} 
            onChange={this.handleCheck()}
          />
          <span>{this.props.taskInfo}</span>
        </label>
        <button onClick={() => {return this.handleClick()}}>删除</button>
      </li>
    )
  }

  handleClick() {
    return this.props.removeTask(this.props.id)
  }

  handleCheck() {
    return (event) => {
      this.props.updateTask(this.props.id, event.target.checked)
    }
  }
}