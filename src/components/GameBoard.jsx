function GameBoard({ board, onCellClick, ghostShape, ghostPosition, texture }) {
  const isGhostCell = (row, col) => {
    if (!ghostShape || !ghostPosition) return false;
    
    const { row: startRow, col: startCol } = ghostPosition;
    const pattern = ghostShape.pattern;
    
    for (let r = 0; r < pattern.length; r++) {
      for (let c = 0; c < pattern[r].length; c++) {
        if (pattern[r][c] === 1 && startRow + r === row && startCol + c === col) {
          return true;
        }
      }
    }
    return false;
  };

  const getCellStyle = (cell) => {
    if (!cell || cell === 'default') return {};
    
    return {
      backgroundImage: `url(${cell})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  };

  return (
    <div className="inline-block bg-gray-800 p-2 rounded-lg shadow-2xl">
      <div className="grid grid-cols-10 gap-0.5">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                w-8 h-8 border border-gray-600 rounded-sm transition-all
                ${cell !== null 
                  ? 'bg-blue-500' 
                  : 'bg-gray-700 hover:bg-gray-600'
                }
                ${isGhostCell(rowIndex, colIndex) ? 'ring-2 ring-green-400 ring-opacity-50 bg-green-500 bg-opacity-30' : ''}
              `}
              style={cell !== null ? getCellStyle(cell) : {}}
              onClick={() => onCellClick && onCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GameBoard;
