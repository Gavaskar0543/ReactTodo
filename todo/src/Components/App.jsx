import { useEffect, useState } from "react"
import { getTodos } from "../api"

function App() {
const [todo,setTodto] = useState('');

useEffect(()=>{
  const fetchTodos = async () => {
    const response = await getTodos();
    console.log('RESPONSE',response.data);
    if(response.success){
     console.log('working!')
    }
  }
  fetchTodos();
},[])
  return (
  <>
<div>
  <button >get</button>
  </div>
  </>
  )
}

export default App
