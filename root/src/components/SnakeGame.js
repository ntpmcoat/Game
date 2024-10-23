import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Snakegame.css";

const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
const SPEED = 300;

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
   
    return parseInt(localStorage.getItem("highScore")) || 0;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });  // Prevent reversing from "down"
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });   // Prevent reversing from "up"
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });  // Prevent reversing from "right"
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });   // Prevent reversing from "left"
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
      newSnake.unshift(head);

      // Check if snake eats the food
      if (head.x === food.x && head.y === food.y) {
        setScore(score + 1);
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
      } else {
        newSnake.pop();
      }

      // Check for collisions
      if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20 || newSnake.slice(1).some(s => s.x === head.x && s.y === head.y)) {
        setIsGameOver(true);
        if (score > highScore) {
          setHighScore(score);  // Update high score if current score is greater
          localStorage.setItem("highScore", score); // Store high score in localStorage
        }
      } else {
        setSnake(newSnake);
      }
    };

    const intervalId = setInterval(moveSnake, SPEED);
    return () => clearInterval(intervalId);
  }, [snake, direction, food, score, isGameOver]);

  const resetGame = () => {
   window.location.reload();
  };

  return (
    <div className="snake-game-container">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="snake-title"
      >
        Snake Game
      </motion.h1>
      <div className="score-board">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p> 
      </div> {isGameOver ?
          (<div className="game-over-popup">
            <p>Game Over!</p>
            <button onClick={resetGame}>New Game</button>
            </div>) :
             (
      <div className="game-board">
       
            <div>
              {Array.from(Array(20)).map((_, rowIndex) =>
                <div key={rowIndex} className="row">
                  {Array.from(Array(20)).map((_, colIndex) => {
                    const isSnake = snake.some(s => s.x === colIndex && s.y === rowIndex);
                    const isFood = food.x === colIndex && food.y === rowIndex;
                    return (
                      <div
                        key={colIndex}
                        className={`cell ${isSnake ? 'snake-cell' : ''} ${isFood ? 'food-cell' : ''}`}
                      />
                    );
                  })}
                </div>
              )}</div>
           
      </div>
 )}

    </div>
  );
};

export default SnakeGame;
