import { useState, useRef, useEffect } from 'react';
import { FiMusic, FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';

const Tunes = ({ volume, setVolume }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="border border-hack-green bg-hack-darker p-2 w-full md:w-72">
      <div className="flex justify-between items-center mb-2 border-b border-hack-green/30 pb-1">
        <span className="text-xs font-bold flex items-center gap-2 text-hack-green">
            <FiMusic className={isPlaying ? "animate-pulse" : ""} /> LOFI_RADIO.MP3
        </span>
        <span className="text-[10px] text-hack-light">{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
      </div>

      <audio ref={audioRef} src={audioSrc} loop />

      <div className="flex gap-3 items-center">
        {/* Play/Pause Control */}
        <button 
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center border border-hack-green bg-hack-green/10 hover:bg-hack-green hover:text-black transition-colors shrink-0"
        >
            {isPlaying ? <FiPause /> : <FiPlay />}
        </button>

        <div className="flex items-center gap-2 flex-1">
            {/* Mute/Unmute Toggle */}
            <button 
                onClick={() => setVolume(volume === 0 ? 0.5 : 0)} 
                className="text-hack-light hover:text-hack-green shrink-0"
            >
                {volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
            </button>
            
            {/* Volume Slider - Con stopPropagation para evitar mover la ventana */}
            <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                
                onPointerDown={(e) => e.stopPropagation()} 
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}

                className="w-full h-1 bg-hack-green/30 appearance-none cursor-pointer rounded-full 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-3 
                [&::-webkit-slider-thumb]:h-3 
                [&::-webkit-slider-thumb]:bg-hack-green 
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:hover:scale-125
                [&::-webkit-slider-thumb]:transition-transform"
            />
            {/* Indicador de Porcentaje (%) */}
            <span className="text-[10px] font-mono text-hack-green w-8 text-right shrink-0">
                {Math.round(volume * 100)}%
            </span>
        </div>
      </div>
    </div>
  );
};

export default Tunes;