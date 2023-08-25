import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { destroyTodos, markDone } from "../api";
import Style from "../Styles/Home.module.css";
import { getTodos } from "../api";
import Loader from "../Components/Loader";
import NewTask from "../Components/NewTask";
import UpdateWindow from "../Components/UpdateWindow";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [showUpdateWindow,setShowUpdateWindow] = useState(false);
  const [selectedTodo,setSelectedTodo] = useState('');
  const [showEditWindow,setShowEditWindow] = useState(false);

 

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();

      if (response.success) {
        setLoading(false);
        setTodos(response.data.data);
      }
    };
    fetchTodos();
  }, [update]);

  if (loading) {
    return <Loader />;
  }

  const handleCheckboxChange = async (id) => {
    // Create a copy of the todos array to modify
    try {
      const response = await markDone(id);
      if (response.success) {
        // Update the todos array to reflect the completed status change
        const updatedTodos = todos.map((todoItem) => {
          if (todoItem._id === id) {
            return { ...todoItem, completed: !todoItem.completed };
          }
          return todoItem;
        });

        setTodos(updatedTodos);
      }
    } catch (error) {
      setUpdate(false);
      console.log(error.message);
      return {
        success: false,
        errorMessage: "An error occurred while marking the task as done.",
      };
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
      
       {
        showEditWindow ? (   showUpdateWindow && (
          <UpdateWindow
          todos={todos}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
            showUpdateWindow={showUpdateWindow}
            setTodos={setTodos}
            setShowUpdateWindow={setShowUpdateWindow}
            editedTitle={editedTitle}
            setEditedTitle={setEditedTitle}
            setShowEditWindow={setShowEditWindow}
          />
        )):(
       
     
          <div className={Style.todoContainer}>
          <div>
            <h1 className="text-4xl text-center">Todo List App</h1>
          <NewTask
            todos={todos}
            setTodos={setTodos}
            updateState={update}
            setUpdateState={setUpdate}
          />
         
          <div className="mt-4 border berder-2 flex-col gap-10">
            {todos.map((todoItem) => (
              <div
                className="flex border border-3 mb-4 h-20 justify-between items-center text-lg capitalize"
                key={todoItem._id}
              >
                <div>
                  <button
                    className={` w-10 ${
                      todoItem.completed ? "bg-green-500" : "bg-red-500"
                    }`}
                    onClick={() => handleCheckboxChange(todoItem._id)}
                  >
                    {/* Display a checkmark icon if completed, or an "X" icon if not completed */}
                    {todoItem.completed ? "✔️" : "❌"}
                  </button>
                </div>

                <div>
                 
                  <p
                    className={
                      todoItem.completed ? "line-through ml-2" : "ml-2"
                    }
                  >
                    {" "}
                    {todoItem.title}{" "}
                  </p>

                </div>
                <div className="flex justify-evenly w-20">
                  <div>
                   <FontAwesomeIcon
  style={{ color: "red" }}
  icon={faPencil}
  onClick={() => {
    setEditedTitle(todoItem.title); // Set the title for editing
    setSelectedTodo(todoItem);
    setShowUpdateWindow(true);
    setShowEditWindow(true);
  }}
/>

                  </div>
                  <div
                    onClick={() => {
                      DeleteTask(todoItem._id);
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon
                      style={{ color: "green" }}
                      icon={faTrash}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
      </div>
        )}
      
    </>
  );
}

export default Home;
