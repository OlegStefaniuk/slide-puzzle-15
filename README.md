# slide-puzzle-15

A complete web-based "15 Puzzle" (slide puzzle) game.

## Features

- **Smooth Animations**: Tiles slide smoothly using CSS transitions.
- **Solvable Shuffles**: Only solvable configurations are generated.
- **Two Visual Themes**:
  - **Minimalist**: Clean, modern look with soft shadows and system fonts.
  - **Retro Pixel**: Neon colors, "Press Start 2P" pixel font, and scanline effect.
- **Two Tile Modes**:
  - **Numbers**: Classic numbered tiles.
  - **Images**: Tiles with unique colorful geometric shapes (SVG placeholders).
- **Internationalization**: Full support for English and Ukrainian.
- **Persisted Settings**: Theme, mode, and language choices are saved in `localStorage`.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Docker Support**: Containerized for easy deployment.

## How to Run Locally

### Using Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

### Using Docker

1. Build and start the container:
   ```bash
   docker-compose up
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```text
slide-puzzle-15/
├── server/
│   └── index.js              # Express server
├── public/
│   ├── index.html            # Main page
│   ├── css/
│   │   ├── style.css         # Shared base styles
│   │   ├── theme-minimal.css # Minimalist theme
│   │   └── theme-retro.css   # Retro pixel theme
│   ├── js/
│   │   ├── app.js            # App initialization
│   │   ├── game.js           # Core game logic
│   │   ├── board.js          # DOM rendering
│   │   ├── timer.js          # Timer module
│   │   ├── i18n.js           # Internationalization
│   │   └── themes.js         # Theme & mode switching
│   └── assets/
│       └── images/           # Tile images
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```