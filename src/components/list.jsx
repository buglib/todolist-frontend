import React from "react"
import { Component } from "react"
import Item from "./item"

export default class List extends Component {
  render() {
    const tasks = this.props.listTasks(this.props.currentView)
    return (
      <div className="todolist-body">
        <ul className="todolist-main">
          {
            tasks.map((task) => {return this.renderItem(task)})
          }
        </ul>
      </div>
    )
  }

  renderItem(task) {
    return (
      <Item 
        key={task.id} 
        id={task.id} 
        taskInfo={task.taskInfo} 
        done={task.done} 
        removeTask={this.props.removeTask} 
        updateTask={this.props.updateTask}
      />
    )
  }
}