document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // DOM elements
  const moveCountEl = document.getElementById('move-count');
  const timerDisplayEl = document.getElementById('timer-display');
  const newGameBtn = document.getElementById('new-game');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const modeToggleBtn = document.getElementById('mode-toggle');
  const langToggleBtn = document.getElementById('lang-toggle');
  const winModal = document.getElementById('win-modal');
  const finalMovesEl = document.getElementById('final-moves');
  const finalTimeEl = document.getElementById('final-time');
  const playAgainBtn = document.getElementById('play-again');

  let gameStarted = false;

  /**
   * Update the UI with the current game state.
   */
  const updateUI = (state) => {
    moveCountEl.textContent = state.moves;
    BoardRenderer.updateBoard(state.board);

    if (state.isWon) {
      handleWin(state);
    }
  };

  /**
   * Handle when a tile is clicked.
   */
  const onTileClick = (tileNumber) => {
    if (!gameStarted) {
      Timer.start((timeString) => {
        timerDisplayEl.textContent = timeString;
      });
      gameStarted = true;
    }

    const state = GameLogic.getState();
    const index = state.board.indexOf(tileNumber);

    const newState = GameLogic.moveTile(index);
    if (newState) {
      updateUI(newState);
    }
  };

  /**
   * Handle game win.
   */
  const handleWin = async (state) => {
    Timer.stop();
    gameStarted = false;

    // Wait for the last move animation to finish
    await new Promise(resolve => setTimeout(resolve, 200));

    // Show win animation
    await BoardRenderer.animateWin();

    // Show win modal
    finalMovesEl.textContent = state.moves;
    finalTimeEl.textContent = Timer.getTimeString();
    winModal.classList.remove('hidden');
  };

  /**
   * Initialize a new game.
   */
  const startNewGame = () => {
    const state = GameLogic.startNewGame();
    Timer.reset();
    timerDisplayEl.textContent = '00:00';
    moveCountEl.textContent = '0';
    gameStarted = false;
    winModal.classList.add('hidden');
    BoardRenderer.render(state.board, onTileClick);
  };

  // Event Listeners
  newGameBtn.addEventListener('click', startNewGame);
  playAgainBtn.addEventListener('click', startNewGame);

  themeToggleBtn.addEventListener('click', () => {
    Themes.toggleTheme();
  });

  modeToggleBtn.addEventListener('click', () => {
    Themes.toggleMode();
  });

  langToggleBtn.addEventListener('click', () => {
    i18n.toggleLanguage();
  });

  // Listen for language changes to update non-standard UI if needed
  document.addEventListener('languageChanged', (e) => {
    // Current translation of "UA / EN" or "EN / UA" is handled by data-i18n
  });

  // Initialization
  Themes.init();
  i18n.updateDOM();
  startNewGame();
});
