import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  // API URL from Vercel/local env
  const API = import.meta.env.VITE_API_URL;

  // Get Todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        console.log("API URL:", API);

        const res = await axios.get(`${API}/todos`);
        setTodos(res.data);
      } catch (error) {
        console.log("GET Error:", error);
      }
    };

    fetchTodos();
  }, [API]);

  // Add Todo
  const addTodo = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/todos`, {
        text,
      });

      setText("");

      // Refresh Todos
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    } catch (error) {
      console.log("POST Error:", error);
    }
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
