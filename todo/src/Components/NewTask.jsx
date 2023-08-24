import React,{useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Style from "../Styles/Home.module.css";
import { postTodos } from "../api";
function NewTask({ todos, setTodos, updateState, setUpdateState }) {
 
  const [newTask, setNewTask] = useState("");
  const [add, setAdd] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdd(true);
    setUpdateState(!updateState);
   
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
  
  return (
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
   
  );
}

// Define PropTypes for the NewTask component
NewTask.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
  updateState: PropTypes.bool.isRequired,
  setUpdateState: PropTypes.func.isRequired,
};

export default NewTask;
