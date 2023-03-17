import React from "react"
import axios from "axios"
import { Component } from "react"
import Header from "../../components/header"
import List from "../../components/list"
import Footer from "../../components/footer"

const client = axios.create({
  baseURL: "http://localhost:8080"
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      currentView: "all", // all tasks, done tasks and todo tasks
      error: null
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render() {
    // console.log("render " + this.state.currentView + " view")
    const error = this.state.error
    if (!error) {
      return (
        <div className="todolist-container">
          <div className="todolist-wrap">
            <Header addTask={this.addTask} />
            <List
              currentView={this.state.currentView}
              listTasks={this.listTasks}
              removeTask={this.removeTask}
              updateTask={this.updateTask}
            />
            <Footer switchView={this.switchView} />
          </div>
        </div>
      )
    } else {
      console.log(error)
      window.alert(error)
    }
  }

  listTasks = (view) => {
    // 先从后端获取所有任务
    if (this.state.tasks.length === 0) {
      this.getTodolist()
    }
    // 然后根据当前视图类型展示对应的任务列表
    const tasks = this.state.tasks.slice()
    if (view === "all") {
      return tasks
    }
    if (view === "done") {
      return tasks.filter((task) => {
        return task.done === true
      })
    }
    if (view === "todo") {
      return tasks.filter((task) => {
        return task.done === false
      })
    }
  }

  addTask = (taskInfo, done) => {
    const oldTasks = this.state.tasks
    // const id = this.state.inc
    const task = {taskInfo, done}
    const newTasks = [task, ...oldTasks]
    this.postTodolist(task)
    this.setState({
      tasks: newTasks
    })
  }

  removeTask = (id) => {
    const oldTasks = this.state.tasks.slice()
    const newTasks = oldTasks.filter((task) => {
      return task.id !== id
    })
    this.deleteTodoItem(id)
    this.setState({
      tasks: newTasks
    })
  }

  updateTask = (id, done) => {
    const oldTasks = this.state.tasks
    const newTasks = oldTasks.map((task) => {
      if (task.id === id) {
        task.done = done
        this.putTodoItem(task)
        return task
      } else {
        return task
      }
    })
    this.setState({
      tasks: newTasks
    })
  }

  switchView = (view) => {
    if (view === "all" || view === "done" || view === "todo") {
      this.setState({
        currentView: view
      })
    }
  }

  getTodolist() {
    client.get("/v1/todolist")
      .then((resp) => {
        this.setState({
          tasks: resp.data.data
        })
      })
      .catch((error) => {
        this.setState({
          error: error
        })
      })
  }

  postTodolist(task) {
    client.post(
      "/v1/todolist",
      task
    ).then((resp) => {
      if (resp.status !== 200) {
        this.setState({
          error: resp.data.message
        })
      }
    }).catch((error) => {
      this.setState({
        error: error
      })
    })
  }

  putTodoItem(task) {
    client.put(
      "/v1/todolist/" + task.id,
      task
    ).then((resp) => {
      if (resp.status !== 200) {
        this.setState({
          error: resp.data.message
        })
      }
    }).catch((error) => {
      this.setState({
        error: error
      })
    })
  }

  deleteTodoItem(id) {
    client.delete(
      "/v1/todolist/" + id
    ).then((resp) => {
      if (resp.status !== 200) {
        this.setState({
          error: resp.data.message
        })
      }
    }).catch((error) => {
      this.setState({
        error: error
      })
    })
  }
}
