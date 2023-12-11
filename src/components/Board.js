import React from "react";
import Cell from "./Cell";

function Board({
  board,
  onCellClick,
  isPlayerBoard,
  playerShipPositions,
  setPlayerShipPositions,
  setPlayerBoard,
}) {
  const handleCellClick = (rowIndex, colIndex) => {
    if (isPlayerBoard) {
      const newPosition = { row: rowIndex, col: colIndex };

      const isShipOccupied =
        playerShipPositions &&
        playerShipPositions.some(
          (position) => position.row === rowIndex && position.col === colIndex
        );

      if (!isShipOccupied) {
        const updatedBoard = board.map((row, i) =>
          row.map((cell, j) => (i === rowIndex && j === colIndex ? 1 : cell))
        );

        const updatedPlayerShipPositions = [...playerShipPositions, newPosition];

        console.log("Posiciones de barcos actualizadas:", updatedPlayerShipPositions);

        setPlayerBoard(updatedBoard);
        setPlayerShipPositions(updatedPlayerShipPositions);
      } else {
        console.log("Esta posición ya está ocupada por otro barco.");
      }
    } else {
      if (onCellClick) {
        onCellClick(rowIndex, colIndex);
      }
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              isPlayerBoard={isPlayerBoard}
              isShip={
                playerShipPositions &&
                playerShipPositions.some(
                  (position) => position.row === rowIndex && position.col === colIndex
                )
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
