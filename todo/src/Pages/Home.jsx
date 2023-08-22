import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { destroyTodos } from "../api";
import Style from "../Styles/Home.module.css";
import { getTodos } from "../api";
import { postTodos } from "../api";
import Loader from "../Components/Loader";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [add, setAdd] = useState(false);

 
  let updateTask;
  const handleUpdate = (id) => {
    setUpdate(true);
    updateTask = todos.filter((todoItem) => todoItem._id === id);
  };
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();

      if (response.success) {
        setLoading(false);
        setTodos(response.data.data);
      }
    };
    fetchTodos();
  }, []);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdd(true);
   
    if (!newTask) {
      toast.error('Give me some task to add!');
      setAdd(false);
      return;
    }

    const response = await postTodos( newTask ); // Corrected parameter

    if (response.success) {
      setAdd(false);
      toast.success('Task added');
      
    
      setNewTask(""); // Clear the input field
     
    } else {
      setAdd(false);
      toast.error('Task not added!');
    }
  }
  if (loading) {
    return <Loader />;
  }

  const handleCheckboxChange = (index) => {
    // Create a copy of the todos array to modify
    const updatedTodos = [...todos];

    // Find the todo item by its index
    const todoToUpdate = updatedTodos.find((task) => task._id === index);

    if (todoToUpdate) {
        // Toggle the completed property from false to true
        todoToUpdate.completed = true;

        // Update the state using the modified array
        setTodos(updatedTodos);
    }
};


  const DeleteTask = async (id) => {
    const response = await destroyTodos(id);

    if (response.success) {
      console.log("Deleted!");
      const updatedTodo = todos.filter((todoItem) => todoItem._id !== id);
      setTodos(updatedTodo);
    } else {
      console.log("Not deleted");
    }
  };

  return (
    <>
      <div className={Style.todoContainer}>
        <div>
          <h1 className="text-4xl text-center">Todo List App</h1>
          <div>
      <ToastContainer />
      <form className={Style.form} onSubmit={handleSubmit}>
       <div>
        <input
          type="text"
          name="title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter Task"
        />
        
        </div>
        <div>
       
          <button disabled={add}>{add ? 'Adding' : 'Add'}</button>
       </div>
      </form>
    </div>

          <div className="mt-4 border berder-2 flex-col gap-10">
            {todos.map((todoItem) => (
              <div
                className="flex border border-3 mb-4 h-20 justify-between items-center text-lg capitalize"
                key={todoItem._id}
              >
               <div> <input className="h-5 w-10" type="checkbox"  checked={todoItem.completed}   onChange={() => handleCheckboxChange(todoItem._id)}
 /></div>
               <div>
               <p className={todoItem.completed ? 'line-through ml-2' : 'ml-2'}> {todoItem.title} </p>
                </div>
                <div className="flex justify-evenly w-20">
                <div>  <FontAwesomeIcon style={{color:"red"}} icon={faPencil}/></div>
                 <div onClick={() => {DeleteTask(todoItem._id)}}> <FontAwesomeIcon  style={{color:"green"}} icon={faTrash}/></div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
