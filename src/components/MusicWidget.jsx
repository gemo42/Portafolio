import { FiPlay, FiPause, FiMusic, FiVolume2 } from 'react-icons/fi';

const MusicWidget = ({ volume, setVolume, isPlaying, togglePlay }) => {
  const today = new Date();
  
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const fullDate = today.toLocaleDateString('en-US', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  }).toUpperCase();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[5] pointer-events-none select-none font-mono">
      
      <div className="text-center mb-12">
        <h1 className="text-7xl md:text-9xl font-black text-white tracking-[0.2em] leading-none mb-4 drop-shadow-2xl opacity-80">
          {dayName}
        </h1>
        <p className="text-xl md:text-2xl font-bold text-white tracking-[0.2em] opacity-70">
          {fullDate}.
        </p>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-hack-green/40 p-5 rounded-xl w-[420px] shadow-[0_0_40px_rgba(0,0,0,0.7)] pointer-events-auto">
        <div className="flex items-center gap-6">

          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              togglePlay();
            }}
            className="w-16 h-16 flex items-center justify-center border-2 border-hack-green rounded-full text-hack-green hover:bg-hack-green hover:text-black transition-all cursor-pointer shrink-0 active:scale-95"
          >
            {isPlaying ? <FiPause size={32} /> : <FiPlay size={32} className="ml-1" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <FiMusic className={isPlaying ? "animate-pulse text-hack-green" : "text-hack-light"} size={16} />
              <p className="text-[12px] font-bold text-hack-green tracking-widest truncate uppercase">
                Lofi_Study_Beats.mp3
              </p>
            </div>

            <div className="flex items-center gap-4 group">
              <FiVolume2 size={16} className="text-hack-green shrink-0" />
              
              <div className="relative flex-1 h-6 flex items-center">

                <div className="absolute w-full h-1 bg-white/10 rounded-full" />

                <div 
                  className="absolute h-1 bg-hack-green shadow-[0_0_10px_#0f0] rounded-full"
                  style={{ width: `${volume * 100}%` }} 
                />
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />
              </div>

              <span className="text-[11px] font-bold text-hack-green w-10 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicWidget;