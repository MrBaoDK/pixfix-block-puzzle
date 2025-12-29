// Game logic utilities for collision detection and line clearing

const BOARD_SIZE = 10;

export function canPlaceShape(board, shape, startRow, startCol) {
  const pattern = shape.pattern;
  
  for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[r].length; c++) {
      if (pattern[r][c] === 1) {
        const boardRow = startRow + r;
        const boardCol = startCol + c;
        
        // Check if position is out of bounds
        if (boardRow < 0 || boardRow >= BOARD_SIZE || boardCol < 0 || boardCol >= BOARD_SIZE) {
          return false;
        }
        
        // Check if cell is already occupied
        if (board[boardRow][boardCol] !== null) {
          return false;
        }
      }
    }
  }
  
  return true;
}

export function placeShape(board, shape, startRow, startCol, texture) {
  const newBoard = board.map(row => [...row]);
  const pattern = shape.pattern;
  
  for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[r].length; c++) {
      if (pattern[r][c] === 1) {
        newBoard[startRow + r][startCol + c] = texture || 'default';
      }
    }
  }
  
  return newBoard;
}

export function checkAndClearLines(board) {
  let newBoard = board.map(row => [...row]);
  let linesCleared = 0;
  let cellsCleared = 0;
  
  // Track which cells were cleared to avoid double counting
  const clearedCells = new Set();
  
  // Check horizontal lines
  for (let r = 0; r < BOARD_SIZE; r++) {
    if (newBoard[r].every(cell => cell !== null)) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        clearedCells.add(`${r},${c}`);
        newBoard[r][c] = null;
      }
      linesCleared++;
    }
  }
  
  // Check vertical lines
  for (let c = 0; c < BOARD_SIZE; c++) {
    if (newBoard.every(row => row[c] !== null)) {
      for (let r = 0; r < BOARD_SIZE; r++) {
        clearedCells.add(`${r},${c}`);
        newBoard[r][c] = null;
      }
      linesCleared++;
    }
  }
  
  cellsCleared = clearedCells.size;
  
  return { board: newBoard, linesCleared, cellsCleared };
}

export function hasValidMove(board, shapes) {
  for (const shape of shapes) {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (canPlaceShape(board, shape, r, c)) {
          return true;
        }
      }
    }
  }
  return false;
}

export function createEmptyBoard() {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
}

export function calculateScore(shape, linesCleared, cellsCleared) {
  // Points for placing the shape (number of blocks)
  const pattern = shape.pattern;
  let blockCount = 0;
  pattern.forEach(row => {
    row.forEach(cell => {
      if (cell === 1) blockCount++;
    });
  });
  
  // Base score for placing blocks
  let score = blockCount;
  
  // Bonus for clearing lines
  if (linesCleared > 0) {
    score += cellsCleared * 2; // Double points for cleared cells
    score += linesCleared * 10; // Bonus per line
  }
  
  return score;
}
