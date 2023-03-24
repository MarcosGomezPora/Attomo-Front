import React, { useState } from 'react';
import './Login.scss'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://attomo-back-1175.vercel.app/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Incorrect username or password');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        onLogin(data.user, data.isAdmin);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className='inputDiv'>
          <label>
            <input className='inputDiv__input'
              type="text"
              name="user"
              placeholder='Usuario'
              value={formData.user}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <input className='inputDiv__input'
              type="password"
              name="password"
              placeholder='Contraseña'
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        
        <button className='button' type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;