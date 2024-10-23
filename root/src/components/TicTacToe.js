import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true); // Track game mode
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (gameOver || board[index]) return; // Prevent clicking if game is over or cell is occupied
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setGameOver(true);
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  useEffect(() => {
    if (!gameOver && isSinglePlayer && !isXNext) {
      // If it's the computer's turn, make a move
      makeComputerMove();
    }
  }, [isXNext, gameOver]);

  const makeComputerMove = () => {
    const newBoard = board.slice();
    // Simple AI to make a move (random free cell)
    const availableMoves = newBoard.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    if (randomMove !== undefined) {
      newBoard[randomMove] = 'O'; // Computer is 'O'
      setBoard(newBoard);
      setIsXNext(true); // Switch back to player's turn
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <div>
        <button onClick={() => setIsSinglePlayer(true)}>Play vs Computer</button>
        <button onClick={() => setIsSinglePlayer(false)}>Play vs Friend</button>
      </div>
      <div className="status">{status}</div>
      <div className="board" >
        {board.map((value, index) => (
          <button key={index} className="square" onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>
      {gameOver && <button onClick={resetGame}>Restart Game</button>}
    </div>
  );
};

export default TicTacToe;
