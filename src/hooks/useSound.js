import { useCallback } from 'react';

const useSound = () => {
  const playBeep = useCallback((freq = 600, type = 'square', duration = 0.1) => {
    // Creamos el contexto de audio de forma segura
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  }, []);

  const playHover = () => playBeep(800, 'sine', 0.05);
  const playClick = () => playBeep(400, 'square', 0.1);
  const playBoot = () => {
    playBeep(200, 'sawtooth', 0.2);
    setTimeout(() => playBeep(400, 'sawtooth', 0.2), 100);
    setTimeout(() => playBeep(800, 'square', 0.4), 200);
  };

  return { playHover, playClick, playBoot };
};

export default useSound;