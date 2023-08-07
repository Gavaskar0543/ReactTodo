import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Styles from "../Styles/NewTask.module.css";
import { postTodos } from "../api";

function NewTask(props) {
  const [newTask, setNewTask] = useState("");
  const [add, setAdd] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setAdd(true);
    if(!newTask){
      toast.error('Give me some task to add!');
     setAdd(false);
      return;
    }
    const response = await postTodos(NewTask);
    if(response.ok){
      toast.success('task added ')
    }
    else{
     
      toast.error('toast not added!')
     
    }
    setAdd(fasle);

   
  }
  return (
    <div>
      <ToastContainer />
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
