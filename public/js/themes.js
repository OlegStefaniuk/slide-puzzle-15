const Themes = (() => {
  'use strict';

  const THEME_MINIMAL = 'theme-minimal';
  const THEME_RETRO = 'theme-retro';
  
  const MODE_NUMBERS = 'mode-numbers';
  const MODE_IMAGES = 'mode-images';

  let currentTheme = localStorage.getItem('puzzle-theme') || THEME_MINIMAL;
  let currentMode = localStorage.getItem('puzzle-mode') || MODE_NUMBERS;

  const applyTheme = (theme) => {
    document.body.classList.remove(THEME_MINIMAL, THEME_RETRO);
    document.body.classList.add(theme);
    currentTheme = theme;
    localStorage.setItem('puzzle-theme', theme);
  };

  const toggleTheme = () => {
    applyTheme(currentTheme === THEME_MINIMAL ? THEME_RETRO : THEME_MINIMAL);
  };

  const applyMode = (mode) => {
    document.body.classList.remove(MODE_NUMBERS, MODE_IMAGES);
    document.body.classList.add(mode);
    currentMode = mode;
    localStorage.setItem('puzzle-mode', mode);
  };

  const toggleMode = () => {
    applyMode(currentMode === MODE_NUMBERS ? MODE_IMAGES : MODE_NUMBERS);
  };

  const init = () => {
    applyTheme(currentTheme);
    applyMode(currentMode);
  };

  return {
    init,
    toggleTheme,
    toggleMode,
    getTheme: () => currentTheme,
    getMode: () => currentMode
  };
})();
