import React from "react";
import Cell from "./Cell";

function Board({
    board,
    onCellClick,
    isPlayerBoard,
    playerShipPositions,
    setPlayerShipPositions,
    setPlayerBoard,
    totalNumberOfShips
  }) {
    const handleCellClick = (rowIndex, colIndex) => {
      if (isPlayerBoard) {
        const currentPosition = { row: rowIndex, col: colIndex };
  
        const isShipOccupied =
          playerShipPositions &&
          playerShipPositions.some(
            (position) => position.row === rowIndex && position.col === colIndex
          );
  
        const hasShip = board[rowIndex][colIndex] === 1;
  
        const canPlaceShip = playerShipPositions.length < totalNumberOfShips;
  
        if (!isShipOccupied && !hasShip && canPlaceShip) {
          const updatedBoard = board.map((row, i) =>
            row.map((cell, j) => (i === rowIndex && j === colIndex ? 1 : cell))
          );
  
          const updatedPlayerShipPositions = [
            ...playerShipPositions.filter(
              (position) => position.row !== rowIndex || position.col !== colIndex
            ),
            currentPosition,
          ];
  
          console.log("Posiciones de barcos actualizadas:", updatedPlayerShipPositions);
  
          setPlayerBoard(updatedBoard);
          setPlayerShipPositions(updatedPlayerShipPositions);
        } else if (hasShip) {
          const updatedBoard = board.map((row, i) =>
            row.map((cell, j) => (i === rowIndex && j === colIndex ? 0 : cell))
          );
  
          const updatedPlayerShipPositions = playerShipPositions.filter(
            (position) => position.row !== rowIndex || position.col !== colIndex
          );
  
          console.log("Posición de barco eliminada:", currentPosition);
  
          setPlayerBoard(updatedBoard);
          setPlayerShipPositions(updatedPlayerShipPositions);
        } else if (!canPlaceShip) {
          console.log("Ya has colocado el número máximo de barcos.");
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
          {/* Fila adicional para mostrar números de 1 a 10 */}
          <div className="row">
            {/* Celda vacía en la esquina superior izquierda */}
            <div className="cell corner"></div>
            {Array.from({ length: 10 }).map((_, colIndex) => (
              <div key={colIndex} className="cell number">
                {colIndex + 1}
              </div>
            ))}
          </div>
    
          {/* Resto del tablero */}
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {/* Celda con el número de la fila */}
              <div className="cell number">
                {rowIndex + 1}
              </div>
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
    