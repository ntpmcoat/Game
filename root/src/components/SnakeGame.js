import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Snakegame.css";
// import {getGridSize} from  "./function.js"
const getGridSize = (cellSize) => {
  const boardWidth = Math.min(window.innerWidth * 0.5, cellSize * 20); // Limit to 20 cells max
  const boardHeight = Math.min(window.innerHeight * 0.4, cellSize * 20);
  const cols = Math.floor(boardWidth / cellSize);
  const rows = Math.floor(boardHeight / cellSize);
  return { cols: Math.min(cols, 20), rows: Math.min(rows, 20) };
};

const { cols, rows } = getGridSize(15); // Use the new mobile cell size
const INITIAL_SNAKE = [{ x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const SPEED = 300;

const SnakeGame = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState(generateFood(INITIAL_SNAKE));
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem("highScore")) || 0);

    function generateFood(snake) {
        let newFood;
        do {
            newFood = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowUp":
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case "ArrowDown":
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case "ArrowLeft":
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case "ArrowRight":
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction]);

    useEffect(() => {
        if (isGameOver) return;

        const moveSnake = () => {
            const newSnake = [...snake];
            const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
            newSnake.unshift(head);

            // Check if snake eats the food
            if (head.x === food.x && head.y === food.y) {
                setScore(prevScore => prevScore + 1);
                setFood(generateFood(newSnake)); // Ensure food doesn't spawn on the snake
            } else {
                newSnake.pop();
            }

            // Check for collisions
            if (
                head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows ||
                newSnake.slice(1).some(s => s.x === head.x && s.y === head.y)
            ) {
                setIsGameOver(true);
                if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem("highScore", score);
                }
            } else {
                setSnake(newSnake);
            }
        };

        const intervalId = setInterval(moveSnake, SPEED);
        return () => clearInterval(intervalId);
    }, [snake, direction, food, score, isGameOver, highScore]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFood(INITIAL_SNAKE));
        setScore(0);
        setIsGameOver(false);
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
            </div>
            {isGameOver ? (
                <div className="game-over-popup">
                    <p>Game Over!</p>
                    <button onClick={resetGame}>New Game</button>
                </div>
            ) : (
              <div className="game-board">
              {Array.from(Array(rows)).map((_, rowIndex) =>
                  <div key={rowIndex} className="row">
                      {Array.from(Array(cols)).map((_, colIndex) => {
                          const isHead = rowIndex === snake[0].y && colIndex === snake[0].x;
                          const isSnake = snake.some(s => s.x === colIndex && s.y === rowIndex) && !isHead;
                          const isFood = food.x === colIndex && food.y === rowIndex;
                          return (
                              <div
                                  key={colIndex}
                                  className={`cell ${isHead ? 'snake-head' : ''} ${isSnake ? 'snake-cell' : ''} ${isFood ? 'food-cell' : ''}`}
                              />
                          );
                      })}
                  </div>
              )}
          </div>
          
            )}
        </div>
    );
};

export default SnakeGame;
