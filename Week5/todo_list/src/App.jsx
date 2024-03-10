import './App.css';
import TodoList from './ToDoList.jsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">My Todos</Typography>
        </Toolbar>
      </AppBar>

      <TodoList />
    </>
  )

}

export default App;
