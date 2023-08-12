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

  const handleUpdate = (id)=>{
    const updateTask = todos.filter((todoItem) => todoItem._id === id);
           console.log(updateTask)
          setUpdate(true)
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
    {update ? <input type="text" />: <></>}
      <h1 className={Style.brand}>ToDos!</h1>
      <NewTask todos={todos} />
      <h1 className={Style.popins}>Tasks</h1>
      {todos.map((todoItem) => (
        <div className={Style.taskDiv} key={todoItem._id}>
          <FontAwesomeIcon onClick={() => DeleteTask(todoItem._id)} icon={faTrash} />
          <p>{todoItem.createdAt.split("T")[0]}</p>
        <p>{todoItem.title} <FontAwesomeIcon onClick={()=>handleUpdate(todoItem._id)} icon={faPencil} /> </p>
          {todoItem.completed ? (
            <h4 className={Style.taskDone}>
              <FontAwesomeIcon icon={faFingerprint} />
            </h4>
          ) : (
            <h4 className={Style.taskNotDone}>
              <FontAwesomeIcon icon={faWindowClose} />
            </h4>
          )}
        </div>
      ))}
    </>
  );
}



export default Home;
