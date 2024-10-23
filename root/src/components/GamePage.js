import React from "react";
import { useParams } from "react-router-dom";
import SnakeGame from "./SnakeGame"; // Import Snake game component
import TicTacToe from "./TicTacToe"; // Import Tic Tac Toe component
import "./Style.css";
const GamePage = () => {
  const { id } = useParams();

  return (
    <div className="GamePage">
       {/* <a href="/">
        <button>Back</button> 
      </a> */}
      {id === "snake-game-id" && <SnakeGame />}
      {id === "tic-tac-toe-id" && <TicTacToe />}
    </div>
  );
};

export default GamePage;
