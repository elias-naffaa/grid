import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

const Homepage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/game/games/get"
        );

        console.log(response);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="homepage">
      <h1>Saved Games</h1>

      <div className="games-container">
        {games.map((game) => (
          <Link to={`/game/${game.name}`} key={game._id} className="game-box">
            <h3>{game.name}</h3>
          </Link>
        ))}
      </div>

      <Link to="/create" className="create-game-button">
        Create a New Game
      </Link>
    </div>
  );
};

export default Homepage;
