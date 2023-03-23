import React, {useState, useEffect}  from 'react';
/* import axios from 'axios'; */


const Games = () => {
 /*  const baseURL = 'https://attomo-back-1175.vercel.app/games'
  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setGames(response.data);
    });
  }, []);

  if (!games) return null; */
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('https://attomo-back-1175.vercel.app/games')
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <div>
              <img src={game.image} alt='game'/>
            </div>
            <h2>{game.name}</h2>
            <p>{game.category}</p>
            <p>Votos: {game.votes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;