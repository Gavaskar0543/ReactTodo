import { useEffect, useState } from "react";
import { getTodos } from "../api";
import Home from "../Pages/Home";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();

      if (response.success) {
        setTodos(response.data.slice(0,10));
      }
    };
    fetchTodos();
  }, []);

  return (
    <>
   <Home todo={todos} />
    </>
  );
}

export default App;
