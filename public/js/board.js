const BoardRenderer = (() => {
  'use strict';

  const boardEl = document.getElementById('game-board');
  const size = 4;

  const getTilePosition = (index) => {
    const row = Math.floor(index / size);
    const col = index % size;
    return {
      x: col * 100, // percentage
      y: row * 100  // percentage
    };
  };

  const createTile = (number, index) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.number = number;
    
    if (number === 0) {
      tile.classList.add('tile-empty');
    } else {
      const numberSpan = document.createElement('span');
      numberSpan.classList.add('tile-number');
      numberSpan.textContent = number;
      tile.appendChild(numberSpan);

      const img = document.createElement('img');
      img.classList.add('tile-image');
      // The image source is fixed to the tile number, 
      // which corresponds to its original position in the solved state.
      img.src = `assets/images/tile-${number}.svg`;
      img.alt = `Tile ${number}`;
      tile.appendChild(img);
    }

    updateTilePosition(tile, index);
    return tile;
  };

  const updateTilePosition = (tileEl, index) => {
    const { x, y } = getTilePosition(index);
    // Use CSS variables for the transform so we can easily use them in animations
    tileEl.style.setProperty('--tx', `${x}%`);
    tileEl.style.setProperty('--ty', `${y}%`);
    tileEl.style.transform = `translate(${x}%, ${y}%)`;
  };

  const render = (board, onTileClick) => {
    boardEl.innerHTML = '';
    board.forEach((number, index) => {
      const tile = createTile(number, index);
      if (number !== 0) {
        tile.addEventListener('click', () => {
          // Find current index of this tile in the board array
          // Since the element itself might stay, but index changes
          // Actually, we can just pass the current index of the clicked tile
          // based on where it IS in the DOM or by searching the board
          onTileClick(number);
        });
      }
      boardEl.appendChild(tile);
    });
  };

  const updateBoard = (board) => {
    const tiles = boardEl.querySelectorAll('.tile');
    board.forEach((number, index) => {
      // Find the tile element that has this number
      const tileEl = Array.from(tiles).find(el => parseInt(el.dataset.number) === number);
      if (tileEl) {
        updateTilePosition(tileEl, index);
      }
    });
  };

  const animateWin = async () => {
    const tiles = Array.from(boardEl.querySelectorAll('.tile:not(.tile-empty)'))
      .sort((a, b) => parseInt(a.dataset.number) - parseInt(b.dataset.number));
    
    for (const tile of tiles) {
      tile.classList.add('pulse');
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  return {
    render,
    updateBoard,
    animateWin
  };
})();
