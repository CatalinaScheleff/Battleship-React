import React, { useState, useEffect } from "react";
import Board from "./Board";

const totalNumberOfShips = 5;

const initialPlayerBoard = Array.from({ length: 10 }, () => Array(10).fill(0));
const initialComputerBoard = Array.from({ length: 10 }, () => Array(10).fill(0));

function Game() {
  const [playerBoard, setPlayerBoard] = useState(initialPlayerBoard);
  const [computerBoard, setComputerBoard] = useState(initialComputerBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isPlayerWinner, setIsPlayerWinner] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerShipPositions, setPlayerShipPositions] = useState([]);
  const [initialRender, setInitialRender] = useState(true);

  const firePlayerTorpedo = (row, col) => {
    const cellValue = computerBoard[row][col];
    let updatedComputerBoard = [...computerBoard];

    if (cellValue === 1) {
      console.log("Hit");
      updatedComputerBoard[row][col] = 2;
    } else if (cellValue === 2) {
      console.log("Sunk");
    } else {
      console.log("Miss");
      updatedComputerBoard[row][col] = 3;
    }

    setComputerBoard(updatedComputerBoard);
    setIsPlayerTurn(false);
  };

  const fireComputerTorpedo = () => {
    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 10);
    const cellValue = playerBoard[randomRow][randomCol];

    let updatedPlayerBoard = [...playerBoard];

    if (cellValue === 1) {
      console.log("Hit");
      updatedPlayerBoard[randomRow][randomCol] = 2;
    } else if (cellValue === 2) {
      console.log("Sunk");
    } else {
      console.log("Miss");
      updatedPlayerBoard[randomRow][randomCol] = 3;
    }

    setPlayerBoard(updatedPlayerBoard);
    setIsPlayerTurn(true);
  };

  useEffect(() => {
    if (!initialRender && !isPlayerTurn && !gameOver) {
      const computerTurnTimeout = setTimeout(() => {
        fireComputerTorpedo();
      }, 2000);

      return () => clearTimeout(computerTurnTimeout);
    }
  }, [isPlayerTurn, gameOver, initialRender]);

  useEffect(() => {
    if (!initialRender) {
      const isPlayerWinner = computerBoard.every((row) => row.every((cell) => cell !== 1));
      const isComputerWinner = playerBoard.every((row) => row.every((cell) => cell !== 1));

      if (isPlayerWinner || isComputerWinner) {
        setGameOver(true);
        setIsPlayerWinner(isPlayerWinner);
      }
    }
  }, [playerBoard, computerBoard, initialRender]);

  const restartGame = () => {
    setPlayerBoard(initialPlayerBoard);
    setComputerBoard(initialComputerBoard);
    setIsPlayerTurn(true);
    setGameOver(false);
    setGameStarted(false);
    setInitialRender(true);
  };

  const startGame = () => {
    console.log("Longitud de posiciones de barcos:", playerShipPositions.length);
    console.log("Posiciones de barcos actualizadas:", playerShipPositions);
    if (playerShipPositions.length === totalNumberOfShips) {
      console.log("Entro en la condición para jugar");
      setGameStarted(true);
      setInitialRender(false);
    } else {
      console.log("No se han colocado todos los barcos.");
    }
  };
  

  return (
    <div className="game">
      <h1>Battleship Game</h1>
      <div className="boards">
        <Board
          board={playerBoard}
          onCellClick={startGame}
          isPlayerBoard={true}
          playerShipPositions={playerShipPositions}
          setPlayerShipPositions={setPlayerShipPositions}
          setPlayerBoard={setPlayerBoard}
        />
        <Board
          board={computerBoard}
          onCellClick={isPlayerTurn ? firePlayerTorpedo : null}
          isPlayerBoard={false}
        />
      </div>
      {!gameOver && !gameStarted && (
      <div>
        <p>{isPlayerTurn ? "Coloca tus barcos" : "Turno de la computadora"}</p>
        <button onClick={startGame} disabled={!isPlayerTurn || playerShipPositions.length !== totalNumberOfShips}>
          Jugar
        </button>
      </div>
    )}
      {gameStarted && !gameOver && (
        <div>
          <p>{isPlayerTurn ? "Tu turno" : "Turno de la computadora"}</p>
        </div>
      )}
      {gameOver && (
        <div>
          <p>{isPlayerWinner ? "¡Has ganado!" : "¡La computadora ha ganado!"}</p>
          <button onClick={restartGame}>Reiniciar</button>
        </div>
      )}
    </div>
  );
}

export default Game;
