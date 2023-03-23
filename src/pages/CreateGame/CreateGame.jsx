import React, { useState } from 'react';


const CreateGame = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    category: [],
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch('https://attomo-back-1175.vercel.app/games/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage('Juego añadido');
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
      Imagen:
      <input 
        type="text"
        name='Imagen'
        value={formData.image}
        onChange={handleChange}
      />
    </label>
    <label>
      Nombre:
      <input 
        type="text"
        name='Nombre'
        value={formData.name}
        onChange={handleChange}
      />
    </label>
    <label>
      Categorías:
      <input 
        type="text"
        name='Categorías'
        value={formData.category}
        onChange={handleChange}
      />
    </label>
    <button type='submit'>Añadir</button>
    </form>
    </div>
  );
};

export default CreateGame