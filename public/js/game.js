const GameLogic = (() => {
  'use strict';

  // Game state
  let state = {
    board: [], // 1D array of 16 elements (0 for empty)
    moves: 0,
    isWon: false,
    size: 4
  };

  /**
   * Initialize a solved board.
   */
  const initBoard = () => {
    const board = [];
    for (let i = 1; i <= 15; i++) {
      board.push(i);
    }
    board.push(0); // 0 represents the empty cell
    return board;
  };

  /**
   * Get valid moves for a given empty index.
   */
  const getValidMoves = (emptyIndex, size = 4) => {
    const moves = [];
    const row = Math.floor(emptyIndex / size);
    const col = emptyIndex % size;

    if (row > 0) moves.push(emptyIndex - size); // Up
    if (row < size - 1) moves.push(emptyIndex + size); // Down
    if (col > 0) moves.push(emptyIndex - 1); // Left
    if (col < size - 1) moves.push(emptyIndex + 1); // Right

    return moves;
  };

  /**
   * Shuffle the board using N random valid moves to ensure solvability.
   */
  const shuffle = (board, iterations = 200) => {
    let currentBoard = [...board];
    let emptyIndex = currentBoard.indexOf(0);
    let lastMove = -1;

    for (let i = 0; i < iterations; i++) {
      const validMoves = getValidMoves(emptyIndex);
      // Filter out the reverse of the last move to avoid immediate backtracking
      const movesToConsider = validMoves.filter(move => move !== lastMove);
      const randomMove = movesToConsider[Math.floor(Math.random() * movesToConsider.length)];
      
      // Swap
      [currentBoard[emptyIndex], currentBoard[randomMove]] = [currentBoard[randomMove], currentBoard[emptyIndex]];
      
      lastMove = emptyIndex;
      emptyIndex = randomMove;
    }
    return currentBoard;
  };

  /**
   * Check if the board is in a solved state.
   */
  const checkWin = (board) => {
    for (let i = 0; i < 15; i++) {
      if (board[i] !== i + 1) return false;
    }
    return board[15] === 0;
  };

  /**
   * Handle a move attempt.
   * Returns new state or null if move is invalid.
   */
  const moveTile = (tileIndex) => {
    if (state.isWon) return null;

    const emptyIndex = state.board.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);

    if (validMoves.includes(tileIndex)) {
      const newBoard = [...state.board];
      [newBoard[emptyIndex], newBoard[tileIndex]] = [newBoard[tileIndex], newBoard[emptyIndex]];
      
      state.board = newBoard;
      state.moves++;
      state.isWon = checkWin(newBoard);
      
      return { ...state };
    }

    return null;
  };

  /**
   * Start a new game.
   */
  const startNewGame = () => {
    state.board = shuffle(initBoard());
    state.moves = 0;
    state.isWon = false;
    return { ...state };
  };

  return {
    startNewGame,
    moveTile,
    getState: () => ({ ...state })
  };
})();
