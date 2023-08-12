import { useEffect, useState } from "react";
import { getTodos } from "../api";
import Home from "../Pages/Home";
import loader from './Loader';
import Loader from "./Loader";
function App() {
  const [todos, setTodos] = useState([]);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
      console.log(response);

      if (response.success) {
        setLoading(false);
        setTodos(response.data.data.slice(0,10));
        console.log(todos)
       
      }
    };
    fetchTodos();
  }, []);

  if(loading){
    return <Loader />
  }
  return (
    <>
   <Home todo={todos} />
    </>
  );
}

export default App;
