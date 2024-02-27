import { useState } from "react";
import TodoTable from "./TodoTable";

function App() {
  const [todo, setTodo] = useState({ desc: "", date: "" });
  const [todos, setTodos] = useState([]);

  const addToDo = () => {
    if (todo.desc && todo.date) {
      setTodos([...todos, todo]);
      setTodo({ desc: "", date: "" });
    } else {
      alert("missing data");
    }
  };

  const deleteToDo = (index) => {
    const filteredTodos = todos.filter((todo, i) => i !== index);
    setTodos(filteredTodos);
  };

  return (
    <div>
      <h1>Simple TodoList</h1>
      <p>Add todo:</p>
      <input
        placeholder="Description"
        onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
        value={todo.desc}
      />
      <input
        type="date"
        placeholder="Date"
        onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        value={todo.date}
      />
      <button onClick={addToDo}>Add</button>
      <TodoTable todos={todos} deleteToDo={deleteToDo} />
    </div>
  );
}

export default App;
