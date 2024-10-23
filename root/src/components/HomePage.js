import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight, faGamepad, faPuzzlePiece, faGhost } from '@fortawesome/free-solid-svg-icons';
import "./Style.css";

const games = [
  { 
    _id: "snake-game-id", 
    name: "Snake Game", 
    description: "Play the classic Snake Game!", 
    image: "https://images.unsplash.com/photo-1605479579178-9b71b534e512?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    icon: faChessKnight
  },
  { 
    _id: "tic-tac-toe-id", 
    name: "Tic Tac Toe", 
    description: "Play Tic Tac Toe against a friend or computer!", 
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    icon: faGamepad
  },
  { 
    _id: "tetris-id", 
    name: "Tetris", 
    description: "Arrange falling blocks in this addictive puzzle game!", 
    image: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    icon: faPuzzlePiece
  },
  { 
    _id: "pacman-id", 
    name: "Pac-Man", 
    description: "Navigate mazes and eat dots in this iconic arcade game!", 
    image: "https://images.unsplash.com/photo-1579309401389-a2476dddf3d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    icon: faGhost
  },
];

const HomePage = () => {
  return (
    <div className="home-page">
      <video autoPlay loop muted className="background-video">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-neon-lights-in-a-game-room-4801-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content-overlay">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="main-title"
        >
          Welcome to Game Central
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="game-grid"
        >
          {games.map((game, index) => (
            <motion.div
              key={game._id}
              initial={{ scale: 0, rotate: -360 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.05, delay: index * 0.1 }}
              whileHover={{ scale: 1.3, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="game-card"
            >
              <div className="game-image-container">
                <img src={game.image} alt={game.name} className="game-image" />
                <div className="game-icon-overlay">
                  <FontAwesomeIcon icon={game.icon} className="game-icon" />
                </div>
              </div>
              <div className="game-info">
                <h2 className="game-title">{game.name}</h2>
                <p className="game-description">{game.description}</p>
                <Link to={`/game/${game._id}`} className="play-button">
                  Play Now
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

       
      </div>
    </div>
  );
};

export default HomePage;