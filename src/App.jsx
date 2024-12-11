import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="border border-gray-400 text-5xl rounded-lg bg-white leading-9 w-20 h-20"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ isNextX, squares, onPlay }) {
  const winnar = calculateWinner(squares);
  let status;
  if (winnar) status = `Winnar is ${winnar} 🎉🥳`;
  else status = "Next player is " + (isNextX ? "X" : "O");

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    if (isNextX) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    onPlay(newSquares);
  }
  return (
    <>
      <h1 className="text-3xl mb-7">{status}</h1>
      <div className="grid grid-cols-3 gap-5 w-fit m-1">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isNextX, setIsNextX] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquare = history[currentMove];

  function handlePlay(newSquares) {
    setIsNextX(!isNextX);
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(move) {
    setCurrentMove(move);
    setIsNextX(move % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Let's go to the move # ${move}`;
    } else {
      description = `Let's start the game`;
    }
    return (
      <li key={move} className="mb-1">
        <button className="text-xl " onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });
  return (
    <div className="flex gap-5 justify-center items-center h-svh">
      <div className="flex gap-8">
        <div>
          <Board
            isNextX={isNextX}
            squares={currentSquare}
            onPlay={handlePlay}
          />
        </div>
        <div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
