import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FiX, FiMinus } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const OSWindow = ({ id, title, isOpen, onClose, children, zIndex, onFocus, initialPosition, width = "md:w-[600px]", height = "h-auto" }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dragControls = useDragControls();

  const desktopVariants = {
    hidden: { scale: 0.8, opacity: 0, ...initialPosition },
    visible: { scale: 1, opacity: 1, y: initialPosition.y, x: initialPosition.x },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.15 } }
  };

  const mobileVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 }
  };

  const startDrag = (event) => {
    if (!isMobile) {
      dragControls.start(event);
      onFocus(id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={isMobile ? mobileVariants : desktopVariants}
          drag={!isMobile} 
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          onPointerDown={() => onFocus(id)}
          style={{ zIndex }}
          className={`
            border-2 border-hack-green shadow-[0_0_20px_rgba(0,255,0,0.2)] overflow-hidden flex flex-col
            bg-black/85 backdrop-blur-md
            ${isMobile ? 'fixed inset-0 w-full h-full rounded-none z-[9999]' : 'absolute w-[90%] md:w-[600px] h-auto max-h-[80vh] rounded-sm'}
          `}
        >
          {/* HEADER INTACTO */}
          <div 
            onPointerDown={startDrag}
            className="bg-hack-green text-hack-darker px-4 pt-10 pb-3 md:py-1 md:px-2 flex justify-between items-center select-none cursor-move font-bold uppercase text-sm shadow-md touch-none"
          >
           {/* ... contenido del header ... */}
          </div>

          {/* CONTENIDO CON FONDO TRANSPARENTE PARA PERMITIR EL BLUR DEL CONTENEDOR PADRE */}
          <div className="p-4 text-hack-green overflow-y-auto custom-scrollbar flex-1 bg-transparent pb-20 md:pb-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OSWindow;