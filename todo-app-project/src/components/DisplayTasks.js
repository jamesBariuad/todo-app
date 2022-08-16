import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import "./DisplayTasks.css"
import { v4 as uuidv4 } from 'uuid';

const DisplayTasks = ({ markTaskAsDone, deleteTask, tasks }) => {
  const { status } = useParams()
  let tasksToDisplay

  if (status === "PendingTasks") {
    const pendingTasks = tasks.filter(task => task.done === false)
    tasksToDisplay = pendingTasks
  } else if (status === "FinishedTasks") {
    const finishedTasks = tasks.filter(task => task.done === true)
    tasksToDisplay = finishedTasks
  } else {
    tasksToDisplay = tasks
  }

  const displayTasks = tasksToDisplay.map(task => (
    task.done ?
      (<div className='done boxOfTask' key={uuidv4()}>
        <p>task: {task.name} is done!</p>
        <button onClick={() => handleDeleteClick(task)}>delete</button>
      </div>)
      : (<div className='notDone boxOfTask' key={uuidv4()}>
        <p>task: {task.name}</p>
        <p>priority: {task.priority}</p>
        <button className='doneBtn' onClick={() => handleDoneClick(task)}>Done!</button>
        <button onClick={() => handleDeleteClick(task)}>delete</button>
      </div>)))

  const handleDoneClick = (task) => {
    markTaskAsDone(task.id)
  }

  const handleDeleteClick = (task) => {
    deleteTask(task.id)
  }

  return (
    <div className='blueContainer'>
      <Link to="/AddTask"><img src='https://cdn-icons-png.flaticon.com/512/2312/2312340.png' alt='addtaskbutton'></img></Link>
      <div className='taskBoxesContainer'>
        {displayTasks}
      </div>
    </div>
  )
}

export default DisplayTasks