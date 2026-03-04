const i18n = (() => {
  'use strict';

  const translations = {
    en: {
      title: "15 Puzzle",
      newGame: "New Game",
      moves: "Moves",
      time: "Time",
      winMessage: "Congratulations! You solved the puzzle!",
      playAgain: "Play Again",
      close: "Close",
      theme: "Theme",
      mode: "Mode",
      numbers: "Numbers",
      images: "Images",
      language: "UA / EN"
    },
    ua: {
      title: "Гра в 15",
      newGame: "Нова гра",
      moves: "Ходи",
      time: "Час",
      winMessage: "Вітаємо! Ви зібрали пазл!",
      playAgain: "Грати знову",
      close: "Закрити",
      theme: "Тема",
      mode: "Режим",
      numbers: "Числа",
      images: "Зображення",
      language: "EN / UA"
    }
  };

  let currentLang = localStorage.getItem('puzzle-lang') || 
                   (navigator.language.startsWith('uk') ? 'ua' : 'en');

  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLang = lang;
      localStorage.setItem('puzzle-lang', lang);
      updateDOM();
    }
  };

  const toggleLanguage = () => {
    setLanguage(currentLang === 'en' ? 'ua' : 'en');
  };

  const t = (key) => {
    return translations[currentLang][key] || key;
  };

  const updateDOM = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    // Trigger event for other modules to update if needed
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
  };

  return {
    t,
    setLanguage,
    toggleLanguage,
    getCurrentLang: () => currentLang,
    updateDOM
  };
})();
