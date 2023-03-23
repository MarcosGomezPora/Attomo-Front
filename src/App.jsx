import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Games from './pages/Games/Games';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreateGame from './pages/CreateGame/CreateGame';
/* import axios from 'axios'; */

/* const baseURL = "https://attomo-back-1175.vercel.app/" */

function App() {
  /* const [game, setGame] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setGame(response.data);
    });
  }, []);

  if (!game) return null; */
  /* const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://attomo-back-1175.vercel.app/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []); */

  /* if (!data) {
    
    return <p>Loading...</p>;
  } */

  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          <Route path='/games' element={<Games />} />
          <Route path='/games/create' element={<CreateGame />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
