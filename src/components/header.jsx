import React from "react"
import { Component } from "react"
import { AtInput, AtButton } from "taro-ui"

import "taro-ui/dist/style/components/input.scss"
import "taro-ui/dist/style/components/button.scss"
// import "taro-ui/dist/style/components/loading.scss"

export default class Header extends Component {
  render() {
    const focus = false
    return (
      <div className="todolist-header">
        <input
          id="input-task"
          type="text"
          placeholder="请输入待办任务"
        />

        <AtButton
          type="primary"
          size="small"
          onClick={() => this.handleClick}
        >添加
        </AtButton>
      </div>
    )
  }

  handleClick() {
    const taskInfo = document.getElementById("input-task").value
    this.props.addTask(taskInfo, false)
  }
}
