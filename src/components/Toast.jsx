import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

const Toast = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100000] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`
              pointer-events-auto min-w-[250px] max-w-sm p-3 border-l-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]
              backdrop-blur-md font-mono text-sm flex items-center gap-3
              ${notif.type === 'success' ? 'bg-hack-darker/90 border-hack-green text-hack-green' : ''}
              ${notif.type === 'error' ? 'bg-red-900/90 border-red-500 text-white' : ''}
              ${notif.type === 'info' ? 'bg-blue-900/90 border-blue-400 text-blue-200' : ''}
            `}
          >
            <div className="text-xl">
              {notif.type === 'success' && <FiCheckCircle />}
              {notif.type === 'error' && <FiAlertTriangle />}
              {notif.type === 'info' && <FiInfo />}
            </div>
            <div>
              <p className="font-bold text-xs uppercase tracking-wider mb-0.5">
                {notif.type === 'error' ? 'SYSTEM_ERROR' : 'SYSTEM_NOTIFICATION'}
              </p>
              <p>{notif.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;