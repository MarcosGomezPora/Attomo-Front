import React, { useState } from 'react';
import './Register.scss'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    user: '',
    password: '',
    role: 'user',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://attomo-back-1175.vercel.app/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage('Usuario creado');
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div>
    {successMessage && <p>{successMessage}</p>}
    <form onSubmit={handleSubmit}>
    <div className='inputDiv'>
      <label>
        <input className='inputDiv__input'
          type="text"
          name="name"
          placeholder='Nombre'
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <input className='inputDiv__input'
          type="text"
          name="user"
          placeholder='Nombre de usuario'
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
      <label>
        Rol:
        <select className='inputDiv__input' name="role" value={formData.role} onChange={handleInputChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>
    </div>
    
    <button type="submit" className='button'>Submit</button>
  </form>
  </div>
);
}
export default Register