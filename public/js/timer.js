const Timer = (() => {
  'use strict';

  let startTime;
  let elapsedTime = 0;
  let timerInterval;

  const start = (onTick) => {
    if (timerInterval) return;
    
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      if (onTick) onTick(getTimeString());
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerInterval);
    timerInterval = null;
  };

  const reset = () => {
    stop();
    elapsedTime = 0;
  };

  const getTimeString = () => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    return `${displayMinutes}:${displaySeconds}`;
  };

  return {
    start,
    stop,
    reset,
    getTimeString
  };
})();
