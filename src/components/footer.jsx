import React from "react"
import { Component } from "react"

export default class Footer extends Component {
  render() {
    return (
      <div className="todolist-footer">
        <button onClick={this.handleClickAll}>全部任务</button>
        <button onClick={this.handleClickDone}>已完成任务</button>
        <button onClick={this.handleClickTodo}>待办任务</button>
      </div>
    )
  }

  handleClickAll = () => {
    this.props.switchView("all")
  }

  handleClickDone = () => {
    this.props.switchView("done")
  }

  handleClickTodo = () => {
    this.props.switchView("todo")
  }
}
