import { useEffect, useState } from "react";
import axios from "axios"
function App() {

  const [value, setValue] = useState("")
  const[todos, setTodos] = useState([])

  function handleNewTodo(){
    if (value === "") return;
    axios
    .post("http://127.0.0.1:8000/todos", {title:value})
    .then(()=> fetchTodos())
  }

  function fetchTodos(){
    axios.get("http://127.0.0.1:8000/todos").then((res) => setTodos(res.data))

  }


  useEffect(()=> {
    fetchTodos()
  }, []) 


  return (
    <div>
      <h1>My Todo App</h1>
      <label> Yeni Todo olustur</label>
      <input className="input-todo" type="text" onChange={(e) => setValue(e.target.value)}/>
      <button className="add-button" onClick={handleNewTodo}>+Olustur</button> 

      <div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
