import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  return (
    <div className="board">
      <div className="board-row">
        {squares.slice(0, 3).map((value, index) => (
          <Square key={index} value={value} onClick={() => onClick(index)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(3, 6).map((value, index) => (
          <Square
            key={index + 3}
            value={value}
            onClick={() => onClick(index + 3)}
          />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(6, 9).map((value, index) => (
          <Square
            key={index + 6}
            value={value}
            onClick={() => onClick(index + 6)}
          />
        ))}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handleSquareClick(index) {
    const nextSquares = currentSquares.slice();
    if (isAdjacentToBlank(index)) {
      const blankIndex = nextSquares.indexOf(null);
      [nextSquares[index], nextSquares[blankIndex]] = [
        nextSquares[blankIndex],
        nextSquares[index],
      ];
      const nextHistory = history
        .slice(0, currentMove + 1)
        .concat([nextSquares]);
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
    
    return (
      <div className="game">
        <div className="buttons">
          <button onClick={scramblePuzzle}>Scramble</button>
          <ol>{moves}</ol>
        </div>
        <div className="game-board">
          <Board squares={currentSquares} onClick={handleSquareClick} />
        </div>
        <div className="game-info">
          {/* Move history */}
        </div>
      </div>
    );
  }

  function isAdjacentToBlank(index) {
    const blankIndex = currentSquares.indexOf(null);
    const adjacentIndices = [1, -1, 3, -3, 5, -5, 7, -7];
    return adjacentIndices.includes(index - blankIndex);
  }

  function scramblePuzzle() {
    let currentSquares = Array.from(goalState);
    const moves = 100; // Number of random swaps
    for (let i = 0; i < moves; i++) {
      // Generate two random indices
      const randomIndex1 = Math.floor(Math.random() * 9);
      const randomIndex2 = Math.floor(Math.random() * 9);
      // Swap the values at the random indices
      [currentSquares[randomIndex1], currentSquares[randomIndex2]] = [
        currentSquares[randomIndex2],
        currentSquares[randomIndex1],
      ];
    }
    setHistory([currentSquares]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => setCurrentMove(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={handleSquareClick} />
      </div>
      <div className="game-info">
        <button onClick={scramblePuzzle}>Scramble</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const goalState = [1, 2, 3, 8, null, 4, 7, 6, 5];

export default Game;
