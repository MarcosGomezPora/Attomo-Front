import React, { useState } from 'react';


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
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Nombre de usuario:
      <input
        type="text"
        name="user"
        value={formData.user}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Password:
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Role:
      <select name="role" value={formData.role} onChange={handleInputChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </label>
    <button type="submit">Submit</button>
  </form>
  </div>
);
}
export default Register