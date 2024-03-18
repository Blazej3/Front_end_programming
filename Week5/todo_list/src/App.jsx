import './App.css';
import TodoList from './ToDoList.jsx';

//import AppBar from '@mui/material/AppBar';
//import Toolbar from '@mui/material/Toolbar';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



function App() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>

    <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1, bgcolor: 'background.paper' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="HOME" value="1" />
            <Tab label="TODOS" value="2" />

          </TabList>
          
        </Box>

        <TabPanel value="1">Welcome</TabPanel>
        <TabPanel value="2"> <TodoList /> </TabPanel>

      </TabContext>
    </Box>

   
     </>
  );

}

export default App;
