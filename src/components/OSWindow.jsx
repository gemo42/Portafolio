import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FiX, FiMinus, FiMaximize2 } from 'react-icons/fi';

const OSWindow = ({ id, title, isOpen, onClose, children, zIndex, onFocus, initialPosition, width = "md:w-[600px]", height = "h-auto" }) => {
  const isMobile = window.innerWidth < 768;
  const dragControls = useDragControls();

  const desktopVariants = {
    hidden: { scale: 0.8, opacity: 0, ...initialPosition },
    visible: { scale: 1, opacity: 1, y: initialPosition.y, x: initialPosition.x },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.15 } }
  };

  const mobileVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, x: 0, top: 0, left: 0, right: 0, bottom: 0 },
    exit: { opacity: 0, y: 100 }
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
            border-2 border-hack-green bg-hack-darker shadow-[0_0_20px_rgba(0,255,0,0.2)] overflow-hidden flex flex-col
            ${isMobile ? 'fixed inset-0 w-full h-full rounded-none z-[9999]' : `absolute ${width} ${height} max-h-[90vh] rounded-sm`}
          `}
        >
          <div onPointerDown={startDrag} className="bg-hack-green text-hack-darker px-4 pt-10 pb-3 md:py-1 md:px-2 flex justify-between items-center select-none cursor-move font-bold uppercase text-sm shadow-md touch-none">
            <div className="flex items-center gap-2 truncate pr-4 pointer-events-none">
               <span className="font-extrabold">{'>_'}</span> 
               <span className="truncate">{title}</span>
            </div>
            <div className="flex gap-4 md:gap-2 shrink-0">
               <button className="hidden md:block hover:bg-hack-darker hover:text-hack-green p-0.5 border border-hack-green/50 transition-colors pointer-events-auto" onClick={(e) => e.stopPropagation()}><FiMinus /></button>
               <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="hover:bg-hack-darker hover:text-hack-green border border-hack-darker transition-colors bg-hack-darker text-hack-green md:bg-transparent md:text-hack-darker p-2 md:p-0.5 rounded md:rounded-none active:scale-90 pointer-events-auto">
                  <FiX size={isMobile ? 24 : 16} strokeWidth={3} />
               </button>
            </div>
          </div>
          <div className="p-4 text-hack-green overflow-y-auto custom-scrollbar flex-1 bg-hack-dark/95 pb-20 md:pb-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OSWindow;