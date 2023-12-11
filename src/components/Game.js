// src/components/Game.js
import React, { useState, useEffect } from "react";
import Board from "./Board";

const initialPlayerBoard = [
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const initialComputerBoard = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function Game() {
  const [playerBoard, setPlayerBoard] = useState(initialPlayerBoard);
  const [computerBoard, setComputerBoard] = useState(initialComputerBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const firePlayerTorpedo = (row, col) => {
    
    const cellValue = computerBoard[row][col];
  
    let updateComputerBoard = [...computerBoard];
    if (cellValue === 1) {
      console.log('Hit');
      updateComputerBoard[row][col] = 2; 
    } else if (cellValue === 2) {
      console.log('Sunk');
    } else {
      console.log('Miss');
      updateComputerBoard[row][col] = 3;
      console.log(updateComputerBoard[row][col])
    }
  
    setComputerBoard(updateComputerBoard);
  
    setIsPlayerTurn(false);
  };

  const fireComputerTorpedo = () => {
    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 10);
  
    const cellValue = playerBoard[randomRow][randomCol];
  
    let updatedPlayerBoard = [...playerBoard];
    if (cellValue === 1) {
      console.log('Hit');
      updatedPlayerBoard[randomRow][randomCol] = 2;
    } else if (cellValue === 2) {
      console.log('Sunk');
    } else {
      console.log('Miss');
      updatedPlayerBoard[randomRow][randomCol] = 3;
    }
  
    setPlayerBoard(updatedPlayerBoard);
  
    setIsPlayerTurn(true);
  };
  
  

  useEffect(() => {

    if (!isPlayerTurn) {
      const computerTurnTimeout = setTimeout(() => {
        fireComputerTorpedo();
      }, 1000);

      return () => clearTimeout(computerTurnTimeout);
    }
  }, [isPlayerTurn]);

  return (
    <div className="game">
      <h1>Battleship Game</h1>
      <div className="boards">
        <Board board={playerBoard} onCellClick={null} isPlayerBoard={true} />
        <Board board={computerBoard} onCellClick={isPlayerTurn ? firePlayerTorpedo : null} isPlayerBoard={false} />
      </div>
    </div>
  );
}

export default Game;
