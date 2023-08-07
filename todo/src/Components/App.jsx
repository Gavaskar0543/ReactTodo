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

      if (response.success) {
        setLoading(false);
        setTodos(response.data.slice(0,10));
       
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
