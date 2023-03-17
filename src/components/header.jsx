import React from "react"
import { Component } from "react"

export default class Header extends Component {
  render() {
    return (
      <div className="todolist-header">
        <input id="input-task" type="text" placeholder="请输入待办任务" />
        <button onClick={() => this.handleClick()}>添加</button>
      </div>
    )
  }

  handleClick() {
    const taskInfo = document.getElementById("input-task").value
    this.props.addTask(taskInfo, false)
  }
}