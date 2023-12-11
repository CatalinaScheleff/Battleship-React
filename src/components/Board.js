// src/components/Board.js
import React from 'react';
import Cell from './Cell';

function Board({ board, onCellClick, isPlayerBoard }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => (onCellClick ? onCellClick(rowIndex, colIndex) : null)}
              isPlayerBoard={isPlayerBoard}  
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
