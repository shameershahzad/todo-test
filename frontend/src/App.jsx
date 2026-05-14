import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  // FIX: directly handle inside effect
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${API}/todos`);
        setTodos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (!text) return;

    await axios.post(`${API}/todos`, { text });

    setText("");

    // reload safely
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;