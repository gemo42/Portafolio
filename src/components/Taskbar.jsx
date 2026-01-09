import { FiGrid, FiCode } from 'react-icons/fi';
import { SiSteam, SiEpicgames, SiVisualstudiocode } from 'react-icons/si';

const Taskbar = ({ openWindow }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-black/80 backdrop-blur-lg border-t border-hack-green/20 z-[1000] flex items-center justify-between px-4">
      {/* BOTÓN INICIO */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-hack-green/20 text-hack-green transition-all rounded-md group">
          <FiGrid size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
        <div className="h-6 w-[1px] bg-white/10 mx-2" />
      </div>

      {/* APPS ANCLADAS (Gaming & Dev) */}
      <div className="flex items-center gap-4">
        <TaskIcon icon={<SiVisualstudiocode size={20} />} label="VS Code" color="hover:text-blue-400" />
        <TaskIcon icon={<SiSteam size={22} />} label="Steam" color="hover:text-blue-500" />
        <TaskIcon icon={<SiEpicgames size={20} />} label="Epic" color="hover:text-white" />
        <div className="h-6 w-[1px] bg-white/10 mx-2" />
        <TaskIcon icon={<FiCode size={20} />} label="Terminal" onClick={() => openWindow('terminal')} color="hover:text-hack-green" />
      </div>

      {/* ESPACIO VACÍO PARA EQUILIBRIO */}
      <div className="flex items-center gap-4 opacity-50 text-[10px] font-mono text-hack-green">
        <span className="hidden md:block">RICHARD_KERNEL_V1.0</span>
      </div>
    </div>
  );
};

const TaskIcon = ({ icon, label, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`p-2 transition-all duration-300 transform hover:-translate-y-1 ${color} text-white/50 relative group`}
  >
    {icon}
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-hack-darker border border-hack-green/30 px-2 py-1 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </button>
);

export default Taskbar;