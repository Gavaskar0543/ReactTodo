import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWindowClose, faFingerprint,faPencil } from '@fortawesome/free-solid-svg-icons';
import NewTask from '../Components/NewTask';
import { destroyTodos } from '../api';
import Style from '../Styles/Home.module.css';
import { getTodos } from "../api";
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading,setLoading] = useState(true)
  const [update,setUpdate] =useState(false);
let updateTask;
  const handleUpdate = (id)=>{
    setUpdate(true);
     updateTask = todos.filter((todoItem) => todoItem._id === id);
     
  }
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
     

      if (response.success) {
        setLoading(false);
        setTodos(response.data.data);
        
       
      }
    };
    fetchTodos();
  }, [todos]);

  
 

  if(loading){
    return <Loader />
  }
  const DeleteTask = async (id) => {
    const response = await destroyTodos(id);

    if (response.success) {
      console.log('Deleted!');
      const updatedTodo = todos.filter((todoItem) => todoItem._id !== id);
      setTodos(updatedTodo);
    } else {
      console.log('Not deleted');
    }
  };
 
 
 
  return (
    <>
    <div className={Style.todoContainer}>
      <div>
      <h1 className={Style.heading} >Todo List App</h1>
      <NewTask todos={todos} />
     
      
      {update ? <input type="text" / >: <></>}
      
      {todos.map((todoItem) => (
        <div  key={todoItem._id}>
          <FontAwesomeIcon onClick={() => DeleteTask(todoItem._id)} icon={faTrash} />
          <p>{todoItem.createdAt.split("T")[0]}</p>
        <p>{todoItem.title} <FontAwesomeIcon onClick={()=>handleUpdate(todoItem._id)} icon={faPencil} /> </p>
          {todoItem.completed ? (
            <h4>
              <FontAwesomeIcon icon={faFingerprint} />
            </h4>
          ) : (
            <h4 >
              <FontAwesomeIcon icon={faWindowClose} />
            </h4>
          )}
        </div>
      ))}
      </div>
      </div>
    </>
  );
}



export default Home;
