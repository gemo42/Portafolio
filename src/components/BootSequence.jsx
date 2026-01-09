import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BootSequence = ({ onComplete }) => {
  const [textLines, setTextLines] = useState([]);
  const [progress, setProgress] = useState(0);

  const bootText = [
    "INITIALIZING_KERNEL...",
    "LOADING_MODULES: [ CPU, RAM, GPU ]...",
    "CHECKING_INTEGRITY... OK",
    "ESTABLISHING_SECURE_CONNECTION...",
    "DECRYPTING_USER_DATA...",
    "MOUNTING_VIRTUAL_DRIVE...",
    "ACCESS_LEVEL: ADMIN",
    "WELCOME_RICHARD.DEV"
  ];

  useEffect(() => {
    let currentLine = 0;
    const textInterval = setInterval(() => {
      if (currentLine < bootText.length) {
        setTextLines(prev => [...prev, bootText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(textInterval);
        startProgressBar();
      }
    }, 150);

    return () => clearInterval(textInterval);
  }, []);

  const startProgressBar = () => {
    const barInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(barInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col justify-end pb-20 pl-4 md:pl-20 font-mono text-hack-green text-sm md:text-base select-none cursor-wait">
      <div className="max-w-2xl w-full">
        <div className="mb-8 space-y-1">
          {textLines.map((line, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-hack-light">{`>`}</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>

        {textLines.length === bootText.length && (
          <div className="w-full max-w-md">
            <div className="flex justify-between mb-1 text-xs text-hack-light">
              <span>LOADING_SYSTEM</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-hack-darker border border-hack-green/30 p-0.5">
              <motion.div 
                className="h-full bg-hack-green shadow-[0_0_10px_#0f0]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="crt-overlay absolute inset-0 pointer-events-none"></div>
    </div>
  );
};

export default BootSequence;