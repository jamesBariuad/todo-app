import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "./AddTaskForm.css"

const AddTaskForm = ({tasks,addTask, addTaskToggle}) => {
  const [taskName, setTaskName] = useState("")
  const [priority, setPriority] = useState("Normal")
 
  const handleTaskName = (e) => {
    setTaskName(e.target.value)
  }

  const handlePrioritySelect = (e) => { 
    setPriority(e.target.value)
  }

  const handleAddTaskClick = (e) => {
    e.preventDefault()
    const checkIfDuplicate = tasks.filter(e=>e.name===taskName);
    
    if (taskName.length===0){
      alert("task name should not be blank!");
    }else if(checkIfDuplicate.length!==0){
      alert("added task is a duplicate! try again");
    }else{
      const taskDeets = {
        id: uuidv4(),
        name: taskName,
        priority: priority,
        done:false
      }
      addTask(taskDeets)
      setTaskName("")
      alert(`${taskName} has been added!`);
    }
  }

  return (
    <div className='AddTaskForm'>
      <form>
        <label value="">Name: </label>
        <input type="text" name="task" value={taskName} onChange={handleTaskName}></input>
        <br></br>
        <label>Choose Priority: </label>
        <select value={priority} onChange={handlePrioritySelect}>
          <option value="Minimum">Minimum</option>
          <option value="Normal">Normal</option>
          <option value="Maximum">Maximum</option>
        </select>
        <br></br>
        <button type='submit' onClick={handleAddTaskClick}>Add Task</button> 
        <Link to="/"><button onClick={()=>addTaskToggle()}>Cancel</button></Link>
      </form>
    </div>
  )
}

export default AddTaskForm