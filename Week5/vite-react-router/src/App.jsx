import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Welcome to React Router</h1>
      </header>
      <nav>
        <Link to={"/"}>Home</Link>
        <> </>
        <Link to={"/about"}>About</Link>
        <> </>
        <Link to={"/contact"}>Contact</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
