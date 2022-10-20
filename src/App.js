import './App.css';
import AddTaskForm from './components/AddTaskForm';
import { useState } from 'react';
import DisplayTasks from './components/DisplayTasks';
import "./components/DisplayTasks.css"
import { Routes, Route, useParams } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), name: 'asd', priority: 'Normal', done: false },
    { id: uuidv4(), name: 'aaaa', priority: 'Maximum', done: false },
    { id: uuidv4(), name: 'asdsss', priority: 'Normal', done: true },
    { id: uuidv4(), name: '123', priority: 'Minimum', done: false },
    { id: uuidv4(), name: '2', priority: 'Normal', done: false },
  ]);
  const [displayAddTaskForm, setDisplayAddTaskForm] = useState(false);
  const addTaskToggle = () => {
    displayAddTaskForm ? setDisplayAddTaskForm(false) : setDisplayAddTaskForm(true);
  }
  const addTask = (taskDeets) => {
    const tasksCopy = [...tasks];
    tasksCopy.push(taskDeets)
    setTasks(tasksCopy)
  }

  let component=useParams()
  console.log(component)

  const markTaskAsDone = (id) => {
    const clickedTask = tasks.filter(task => task.id === id)
    clickedTask[0].done = true
    const indexOfClickedTask = tasks.indexOf(clickedTask[0])

    const tasksCopy = [...tasks]
    tasksCopy.splice(indexOfClickedTask, 1, clickedTask[0])
    setTasks(tasksCopy)
  }

  const deleteTask = (id) => {
    const clickedTask = tasks.filter(task => task.id === id)
    const indexOfClickedTask = tasks.indexOf(clickedTask[0])
    const tasksCopy = [...tasks]
    tasksCopy.splice(indexOfClickedTask, 1)
    setTasks(tasksCopy)
  }


  return (
    <div className='page'>
      <div className="App">
        <div className='header'>
          <h1>✨To-Do-App✨</h1>
          <nav>
            <Link to="/" >All Tasks</Link>
            <Link to="PendingTasks" >Pending Tasks</Link>
            <Link to="FinishedTasks" >Finished Tasks</Link>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<DisplayTasks tasks={tasks} deleteTask={deleteTask} markTaskAsDone={markTaskAsDone}  />} />
          <Route path="AddTask" element={<AddTaskForm tasks={tasks} addTask={addTask} addTaskToggle={addTaskToggle} />} />
          <Route path=":status" element={<DisplayTasks tasks={tasks} deleteTask={deleteTask} markTaskAsDone={markTaskAsDone}  />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
