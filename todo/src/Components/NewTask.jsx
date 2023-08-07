import React, { useState } from "react";
import Styles from "../Styles/NewTask.module.css";
function NewTask(props) {
  const [newTask, setNewTask] = useState("");
  const [add, setAdd] = useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
   
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add task"
        />
        <span>
          <button disabled={add}>{
            add ? 'adding':'add'
          }</button>
        </span>
      </form>
    </div>
  );
}

export default NewTask;
