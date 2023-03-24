import './Games.scss'
import React, { useState, useEffect } from 'react';

const Games = ({ user, onLogout }) => {
  console.log(user);
  const [games, setGames] = useState([]);
  const [votesRemaining, setVotesRemaining] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedGames, setSortedGames] = useState([]);

  useEffect(() => {
    fetch('https://attomo-back-1175.vercel.app/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setSortedGames(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filteredGames = games.filter((game) => {
      const name = game.name.toLowerCase();
      const term = searchTerm.toLowerCase();
      return name.includes(term);
    });
    setSortedGames(filteredGames);
  }, [searchTerm, games]);

  useEffect(() => {
    const sortedGames = [...games].sort((a, b) => b.votes - a.votes);
    setSortedGames(sortedGames);
  }, [games]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://attomo-back-1175.vercel.app/games/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setGames(games.filter((game) => game._id !== id));
      } else {
        console.error('Error deleting game');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (id) => {
    if (votesRemaining === 0) {
      console.log('No more votes remaining');
      return;
    }
    try {
      const response = await fetch(`https://attomo-back-1175.vercel.app/games/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.ok) {
        setGames(games.map((game) => {
          if (game._id === id) {
            game.votes += 1;
          }
          return game;
        }));
        setVotesRemaining(votesRemaining - 1);
      } else {
        console.error('Error voting for game');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='h1'>Lista de juegos</h1>
      <div className='voteFilter'>
      <p>Votes restantes: {votesRemaining}</p>
      <input type="text" placeholder="Busca tu juego" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {user && (
        <button onClick={onLogout}>Logout</button>
      )}
      </div>
      <ul className='list'>
        {sortedGames.map((game) => (
          
          <div className='list_li-container'>
          <li key={game._id}>
          <div className='list__divImage'>
              <img src={game.image} alt='game' className='list__divImage-img'/>
            </div>
            <h2>{game.name}</h2>
            <p>{game.category.join(", ")}</p>
            <p>Votes: {game.votes}</p>
            {user && votesRemaining > 0 && (
              <button onClick={() => handleVote(game._id)}>Vote</button>
            )}
            {user && user.isAdmin && (
              <button onClick={() => handleDelete(game._id)}>Delete</button>
            )}
          </li>
          </div>
            
        ))}
      </ul>
    </div>
  );
};

export default Games;