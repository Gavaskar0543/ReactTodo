import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import NewTask from "../Components/NewTask";
import { destroyTodos } from "../api";
import Style from "../Styles/Home.module.css";
import { getTodos } from "../api";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
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
  }, [todos]);

  if (loading) {
    return <Loader />;
  }
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
          <NewTask todos={todos} />

          <div className="mt-4 border berder-2 flex-col gap-10">
            {todos.map((todoItem) => (
              <div
                className="flex border border-3 mb-4 h-20 justify-between items-center text-lg capitalize"
                key={todoItem._id}
              >
               <div> <input className="h-5 w-10" type="checkbox" /></div>
               <div>
                 <p>{todoItem.title}</p>
                </div>
                <div className="flex justify-evenly w-20">
                <div>  <FontAwesomeIcon style={{color:"red"}} icon={faPencil}/></div>
                 <div> <FontAwesomeIcon style={{color:"green"}} icon={faTrash}/></div>
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
