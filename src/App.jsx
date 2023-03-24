import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Games from './pages/Games/Games';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreateGame from './pages/CreateGame/CreateGame';

function App() {
  
  const [user, setUser] = useState({
    user: '',
    isAdmin: false,
    isAuthenticated: false
  });

  const handleLogin = (user, isAdmin) => {
    setUser({
      user: user,
      isAdmin: isAdmin,
      isAuthenticated: true
    });
  };

  const handleLogout = () => {
    setUser({
      user: '',
      isAdmin: false,
      isAuthenticated: false
    });
  };

  return (
    <div className="App">
      <Navbar user={user} onLogout={handleLogout} />
      <div>
        <Routes>
          <Route path='/games' element={<Games />} />
          {user.isAdmin && (
            <Route path='/games/create' element={<CreateGame />} />
          )}
          <Route path='/users/register' element={<Register />} />
          <Route path='/users/login' element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;