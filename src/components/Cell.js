import React from 'react';

function Cell({ value, onClick, isPlayerBoard }) {
  

  const handleClick = () => {
    
    if (onClick) {
      onClick();
    }
  };

  const cellClassName = `cell ${
    isPlayerBoard
      ? (value === 1 ? 'ship' : value === 2 ? 'sunk' : value === 3 ? 'miss' : '')
      : (value === 2 ? 'hit' : value === 3 ? 'miss' : '')
  }`;
  
  return <div className={cellClassName} onClick={handleClick} />;
  
}

export default Cell;
