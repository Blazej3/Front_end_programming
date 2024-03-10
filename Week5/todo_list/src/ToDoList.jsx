import { useState, useRef } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid




function ToDoList() {
  const [todo, setTodo] = useState({
    desc: "",
    priority: "",
    date: ""
  });

  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);


  const [colDefs, setColDefs] = useState([
    { field: 'desc', sortable: true, filter: true },
    {
      field: 'priority', sortable: true, filter: true,
      cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
    },

    { field: 'date', sortable: true, filter: true }
  ]);

  const gridRef = useRef();


  const addToDo = () => {
    if (todo.desc && todo.date) {
      setTodos([...todos, todo]);
      setTodo({ desc: "", date: "", priority: "" });
      setSelectedDate(null);
    } else {
      alert("missing data");
      setTodo({ desc: "", date: "", priority: "" });
    }
  };
  const deleteToDo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Stack direction="row" spacing={2} mt={2} justifyContent="center" alignItems="center">
        <TextField
          label="Description"
          onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
          value={todo.desc}
        />

        <TextField
          label="Priority"
          onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
          value={todo.priority}
        />



        <DatePicker
          label="Date"
          value={selectedDate}

          onChange={(date) => { setSelectedDate(date); 
          const dateString = date.toISOString().split('T')[0]; 
          setTodo({ ...todo, date: dateString }); }}

        />


        <Button variant="contained" onClick={addToDo}>Add</Button>
        <Button variant="contained" color="error" onClick={deleteToDo}>Delete</Button>

      </Stack>

      <div
        className="ag-theme-material" // applying the grid theme
        style={{ height: 600, width: 650 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowData={todos}
          columnDefs={colDefs}
          rowSelection="single"
        />
      </div>

    </LocalizationProvider>
  );
}
export default ToDoList;