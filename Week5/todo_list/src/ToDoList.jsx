import { useState } from "react";

import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid




function ToDoList() {
  const [todo, setTodo] = useState({
    desc: "",
    priority: "",
    date: ""
  });

  const [todos, setTodos] = useState([]);


  const [colDefs, setColDefs] = useState([
    {field: 'desc', sortable: true, filter: true},
    {field: 'priority', sortable: true, filter: true, 
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} },
    
    {field: 'date', sortable: true, filter: true}
  ]);


  const addToDo = () => {
    if (todo.desc && todo.date) {
      setTodos([...todos, todo]);
      setTodo({ desc: "", date: "", priority: "" });
    } else {
      alert("missing data");
      setTodo({ desc: "", date: "", priority: "" });
    }
  };
  const deleteToDo = (index) => {
    console.log(index);
    const filteredTodos = todos.filter((todo, i) => i !== index);
    setTodos(filteredTodos);
  };



  return (
    <>
      <h1>Simple Todolist</h1>
      <p>Add todo:</p>

      <input
        placeholder="Description"
        onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
        value={todo.desc}
      />

      <input
        placeholder="Priority"
        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
        value={todo.priority}
      />

      <input
        type="date"
        placeholder="Date"
        onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        value={todo.date}
      />
      <button onClick={addToDo}>Add</button>




      <div
        className="ag-theme-material" // applying the grid theme
        style={{ height: 600, width: 650}} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={todos}
          columnDefs={colDefs}
        />
      </div>

    </>
  );
}
export default ToDoList;