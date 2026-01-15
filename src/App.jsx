import { useState, useEffect, useRef } from 'react';
import OSWindow from './components/OSWindow';
import BootSequence from './components/BootSequence';
import Clock from './components/Clock';
import Typewriter from './components/Typewriter';
import Terminal from './components/Terminal';
import SkillBar from './components/SkillBar';
import MatrixRain from './components/MatrixRain'; 
import Tunes from './components/Tunes';           
import Toast from './components/Toast';   
import MusicWidget from './components/MusicWidget';        
import useSound from './hooks/useSound';
import { 
  FiFolder, FiTerminal, FiCpu, FiMail, FiGithub, FiLinkedin, 
  FiCommand, FiExternalLink, FiCode, FiSettings, FiMonitor, 
  FiMusic, FiCopy, FiFileText, FiDownload, FiGrid, FiUserPlus, FiGithub as GithubIcon
} from 'react-icons/fi';
import { SiSteam, SiEpicgames, SiDiscord, SiOpera } from 'react-icons/si';


const ThemeBtn = ({ name, color, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-2 p-2 border-2 ${active ? 'border-hack-green bg-hack-green/20 shadow-[0_0_10px_rgba(0,255,0,0.3)]' : 'border-hack-green/30 hover:bg-hack-green/10'} transition-all text-xs font-black text-white cursor-pointer uppercase font-mono`}>
        <div className={`w-3 h-3 rounded-full ${color} shadow-[0_0_5px_currentColor]`}></div>
        {name}
    </button>
);

const DesktopIcon = ({ icon, label, onClick, onHover }) => {
    const safeHover = () => { try { onHover(); } catch (e) {} };
    return (
        <div onClick={onClick} onMouseEnter={safeHover} className="group flex flex-col items-center gap-1 md:gap-2 w-20 md:w-24 cursor-pointer text-hack-green/70 hover:text-hack-green transition-all hover:scale-105 active:scale-95 uppercase font-black tracking-tighter">
            <div className="p-3 md:p-4 border-2 border-transparent group-hover:border-hack-green/40 rounded-sm bg-hack-darker/50 shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] transition-all text-hack-green font-black">
                {icon}
            </div>
            <span className="text-[10px] md:text-xs text-center bg-hack-darker/80 px-2 py-1 rounded-sm border border-transparent group-hover:border-hack-green/30 text-hack-light group-hover:text-hack-green font-black shadow-lg uppercase">{label}</span>
        </div>
    )
}

const TaskIcon = ({ icon, label, onClick, color }) => (
  <button onClick={onClick} className={`p-2 transition-all duration-300 transform hover:-translate-y-1 ${color} text-white/40 relative group cursor-pointer shrink-0`}>
    {icon}
    {/* Tooltip solo visible en hover (desktop) */}
    <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 bg-hack-darker border border-hack-green/30 px-2 py-1 text-[9px] text-hack-green rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl font-bold uppercase font-mono">
      {label}
    </span>
  </button>
);

const Taskbar = ({ openWindow }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-14 md:h-12 bg-black/90 backdrop-blur-xl border-t border-hack-green/20 z-[1000] flex items-center justify-between px-2 md:px-4 select-none pointer-events-auto">
      
      {/* SECCIÓN IZQUIERDA: SISTEMA */}
      <div className="flex items-center gap-1 shrink-0">
        <button className="p-2 hover:bg-hack-green/20 text-hack-green transition-all rounded-md group cursor-pointer mr-1 md:mr-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-500">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </button>
        <TaskIcon icon={<FiTerminal size={18} />} label="TERMINAL" onClick={() => openWindow('terminal')} color="hover:text-hack-green" />
        <TaskIcon icon={<FiSettings size={18} />} label="SETTINGS" onClick={() => openWindow('settings')} color="hover:text-hack-green" />
      </div>

      {/* SECCIÓN CENTRAL: APPS (Scrollbar OCULTO VISUALMENTE) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-auto max-w-[60%] md:max-w-none overflow-x-auto gap-2 md:gap-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <TaskIcon icon={<FiFolder size={20} />} label="FILES" onClick={() => openWindow('projects')} color="hover:text-yellow-400" />
        <TaskIcon icon={<FiCode size={20} />} label="VS_CODE" color="hover:text-blue-400" />
        <TaskIcon icon={<FiGithub size={20} />} label="GITHUB" onClick={() => openWindow('github')} color="hover:text-white" />
        <TaskIcon icon={<SiDiscord size={20} />} label="DISCORD" onClick={() => openWindow('discord')} color="hover:text-[#5865F2]" />
        
        <div className="hidden sm:flex gap-2 md:gap-4">
            <TaskIcon icon={<SiEpicgames size={18} />} label="EPIC_GAMES" color="hover:text-white" />
            <TaskIcon icon={<SiSteam size={20} />} label="STEAM" color="hover:text-blue-500" />
            <TaskIcon icon={<SiOpera size={18} />} label="OPERA_GX" color="hover:text-red-500" />
        </div>
      </div>

      {/* SECCIÓN DERECHA */}
      <div className="flex items-center gap-2 md:gap-4 text-hack-green/60 font-mono text-[10px] font-bold shrink-0">
        <span className="hidden xl:block tracking-widest opacity-40 uppercase">Richard_Kernel_v1.0</span>
        <div className="h-6 w-[1px] bg-white/10 mx-2 hidden lg:block" />
        <Clock />
      </div>
    </div>
  );
};

const SystemStats = () => {
  const [stats, setStats] = useState({ cpu: 12, ram: 4.2 });
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
        ram: (Math.random() * (4.4 - 4.1) + 4.1).toFixed(1)
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:flex fixed top-12 left-1/2 -translate-x-1/2 gap-12 font-mono text-[16px] text-white/60 z-[1] select-none uppercase tracking-[0.4em] font-black drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] pointer-events-none">
      <span>CPU_SYS: {stats.cpu}%</span>
      <span>RAM_LOAD: {stats.ram}GB</span>
    </div>
  );
};

const CONTENT = {
  projects: (
    <div className="font-mono text-sm uppercase p-2 pb-24 md:pb-2">
      <p className="text-hack-light mb-4 animate-pulse lowercase tracking-tighter font-bold"> accessing encrypted archives...</p>
      <div className="grid grid-cols-1 gap-4">
        
        {/* IZZI-SUSHI */}
        <div className="border-2 border-hack-green bg-hack-darker/50 p-4 relative group hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all font-bold">
            <div className="absolute top-0 right-0 bg-hack-green text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">Public_Release</div>
            <h3 className="font-black text-lg mb-1 flex items-center gap-2 text-hack-green uppercase tracking-wider"><FiFolder /> Izzi-sushi</h3>
            <div className="h-[1px] w-full bg-hack-green/30 my-2"></div>
            <p className="text-xs text-hack-light mb-3 lowercase font-mono">Mejora Web para la pagina de Izzi-sushi.</p>
            <div className="flex gap-2 text-[10px] tracking-wider mb-4 text-white font-black">
                <span className="bg-hack-green/20 px-2 border border-hack-green/50">REACT</span>
                <span className="bg-hack-green/20 px-2 border border-hack-green/50">TAILWIND</span>
            </div>
            <div className="flex gap-2">
                <a href="https://izisushi-odh0t62s0-gemo42s-projects.vercel.app" target="_blank" rel="noreferrer" className="flex-1 border-2 border-hack-green hover:bg-hack-green hover:text-black py-1 text-xs font-black transition-colors text-white cursor-pointer uppercase flex items-center justify-center">Demo</a>
                <a href="https://github.com/gemo42/izisushi-app.git" target="_blank" rel="noreferrer" className="flex-1 border-2 border-hack-green hover:bg-hack-green hover:text-black py-1 text-xs font-black transition-colors text-white cursor-pointer uppercase flex items-center justify-center">Code</a>
            </div>
        </div>

        {/* TATTOO STUDIO */}
        <div className="border-2 border-hack-green bg-hack-darker/50 p-4 relative group hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all font-bold">
            <div className="absolute top-0 right-0 bg-hack-green text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">Design</div>
            <h3 className="font-black text-lg mb-1 flex items-center gap-2 text-hack-green uppercase tracking-wider"><FiFolder /> TATTOO_STUDIO</h3>
            <div className="h-[1px] w-full bg-hack-green/30 my-2"></div>
            <p className="text-xs text-hack-light mb-3 lowercase font-mono">Landing page para estudio de tatuajes con temática Neon Retro Tokyo. Estética visual de alto impacto.</p>
            <div className="flex gap-2 text-[10px] tracking-wider mb-4 text-white font-black">
                <span className="bg-hack-green/20 px-2 border border-hack-green/50">HTML/CSS</span>
                <span className="bg-hack-green/20 px-2 border border-hack-green/50">JS</span>
            </div>
            <div className="flex gap-2">
                <a href="https://tattoo-studio-2hxcx0o43-gemo42s-projects.vercel.app" target="_blank" rel="noreferrer" className="flex-1 border-2 border-hack-green hover:bg-hack-green hover:text-black py-1 text-xs font-black transition-colors text-white cursor-pointer uppercase flex items-center justify-center">Demo</a>
                <a href="https://github.com/gemo42/tattoo-studio.git" target="_blank" rel="noreferrer" className="flex-1 border-2 border-hack-green hover:bg-hack-green hover:text-black py-1 text-xs font-black transition-colors text-white cursor-pointer uppercase flex items-center justify-center">Code</a>
            </div>
        </div>

        {/* VALFIT GYM */}
        <div className="border-2 border-hack-green bg-hack-darker/50 p-4 relative group hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all font-bold">
            <div className="absolute top-0 right-0 bg-hack-green text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">UI/UX</div>
            <h3 className="font-black text-lg mb-1 flex items-center gap-2 text-hack-green uppercase tracking-wider"><FiFolder /> VALFIT_GYM</h3>
            <div className="h-[1px] w-full bg-hack-green/30 my-2"></div>
            <p className="text-xs text-hack-light mb-3 lowercase font-mono">Sitio web para gimnasio de alto rendimiento. Diseño agresivo, moderno y totalmente responsivo.</p>
            <div className="flex gap-2 text-[10px] tracking-wider mb-4 text-white font-black">
                <span className="bg-hack-green/20 px-2 border border-hack-green/50">REACT</span>
                <span className="bg-hack-green/20 px-2 border border-hack-green/50">TAILWIND</span>
            </div>
            <div className="flex gap-2">
                <a href="https://valfit.vercel.app" target="_blank" rel="noreferrer" className="flex-1 border-2 border-hack-green hover:bg-hack-green hover:text-black py-1 text-xs font-black transition-colors text-white cursor-pointer uppercase flex items-center justify-center">Demo</a>
                <a href="https://github.com/gemo42/valfit.git" target="_blank" rel="noreferrer" className="flex-1 border-2 border-hack-green hover:bg-hack-green hover:text-black py-1 text-xs font-black transition-colors text-white cursor-pointer uppercase flex items-center justify-center">Code</a>
            </div>
        </div>

      </div>
    </div>
  ),
  about: (
    <div className="font-mono uppercase font-black p-4 pb-24 md:pb-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-hack-green flex items-center justify-center bg-hack-green/20 relative overflow-hidden shrink-0 mx-auto md:mx-0">
                <span className="text-4xl md:text-5xl font-black relative z-10 text-hack-green uppercase">R</span>
                <div className="absolute inset-0 bg-hack-green/20 h-[10%] w-full animate-[spin_2s_linear_infinite]"></div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg md:text-xl font-black neon-glow text-hack-green uppercase">Richard Hernández</p>
              <p className="text-xs md:text-sm text-hack-light font-bold">Ingeniero Informático // Chile</p>
              <p className="text-[10px] md:text-xs mt-2 bg-hack-green text-black inline-block px-1 font-black tracking-[0.2em]">STATUS: ONLINE</p>
            </div>
        </div>
        <p className="mb-2 text-hack-light opacity-50 lowercase tracking-tighter font-mono uppercase font-bold"> executing bio_script.sh...</p>
        <div className="min-h-[100px] border-l-2 border-hack-green/50 pl-3 text-white text-sm md:text-base mb-4 font-bold lowercase">
          <Typewriter text="Ingeniero especializado en arquitectura de software y desarrollo Full Stack. Mi perfil se complementa con certificaciones en Análisis de Datos por Google y metodologías ágiles." delay={20} />
        </div>
    </div>
  ),
  skills: (
    <div className="text-sm text-hack-green uppercase tracking-tighter font-mono font-black p-4 pb-24 md:pb-4">
        <p className="text-hack-light mb-4 lowercase opacity-50 font-bold font-mono"> running system_diagnostics...</p>
        <h3 className="border-b-2 border-hack-green mb-3 font-black bg-hack-green/10 px-1 uppercase tracking-widest text-lg">Core_Modules</h3>
        <SkillBar name="REACT.JS / NEXT.JS" level={90} />
        <SkillBar name="NODE.JS / EXPRESS" level={85} />
        <SkillBar name="SQL / DATABASE_ARCH" level={80} />
        <h3 className="border-b-2 border-hack-green mb-3 font-black bg-hack-green/10 px-1 mt-6 uppercase tracking-widest text-lg">Secondary_Systems</h3>
        <SkillBar name="THREE.JS / WEBGL" level={65} />
        <SkillBar name="WORDPRESS / PHP" level={75} />
        <SkillBar name="DEVOPS / DOCKER" level={60} />
    </div>
  ),
  terminal: (<Terminal />),
  contact: null,
  settings: null,
  resume: null,
  discord: null,
  github: null
};

function App() {
  const [isBooting, setIsBooting] = useState(() => !sessionStorage.getItem('hasBooted'));
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('os-theme') || 'hacker');
  const [volume, setVolume] = useState(() => {
    const savedVol = localStorage.getItem('os-volume');
    return savedVol !== null ? parseFloat(savedVol) : 0.5;
  });

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";
  const { playHover, playClick, playBoot } = useSound(); 
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('os-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    localStorage.setItem('os-volume', volume);
  }, [volume]);

  const changeTheme = (theme) => {
    playClick();
    setCurrentTheme(theme);
    addToast(`THEME UPDATED: ${theme.toUpperCase()}`, 'info');
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log("Audio waiting for interaction"));
      setIsPlaying(!isPlaying);
    }
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      playClick();
      addToast('COPIED TO CLIPBOARD', 'success');
  };

  const [windowsState, setWindowsState] = useState({
    projects: { isOpen: false, z: 20, pos: { x: 50, y: 50 } },
    about:    { isOpen: false, z: 20, pos: { x: 80, y: 80 } },
    skills:   { isOpen: false, z: 20, pos: { x: 110, y: 110 } },
    contact:  { isOpen: false, z: 20, pos: { x: 140, y: 140 } },
    terminal: { isOpen: false, z: 20, pos: { x: 170, y: 170 } },
    settings: { isOpen: false, z: 20, pos: { x: 200, y: 200 } },
    resume:   { isOpen: false, z: 20, pos: { x: window.innerWidth > 768 ? 400 : 20, y: 50 } },
    discord:  { isOpen: false, z: 20, pos: { x: 230, y: 150 } },
    github:   { isOpen: false, z: 20, pos: { x: 250, y: 180 } }
  });

  const openWindow = (id) => {
    playClick();
    setWindowsState(prev => {
      const highestZ = Math.max(...Object.values(prev).map(w => w.z), 20);
      return { ...prev, [id]: { ...prev[id], isOpen: true, z: highestZ + 1 } };
    });
  };

  const closeWindow = (id) => {
    playClick();
    setWindowsState(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
  };

  const focusWindow = (id) => {
    setWindowsState(prev => {
      const highestZ = Math.max(...Object.values(prev).map(w => w.z), 20);
      return { ...prev, [id]: { ...prev[id], z: highestZ + 1 } };
    });
  };

  const dynamicContent = {
      ...CONTENT,
      github: (
        <div className="font-mono p-6 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shadow-xl">
            <FiGithub size={60} className="text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">gemo42</h2>
            <p className="text-hack-green text-xs font-bold opacity-80 uppercase tracking-widest">Repositories & Open Source</p>
          </div>
          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={() => copyToClipboard("https://github.com/gemo42")}
              className="flex items-center justify-center gap-3 border-2 border-white/40 bg-white/5 p-3 hover:bg-white hover:text-black transition-all font-black text-xs uppercase"
            >
              <FiCopy /> Copy Profile Link
            </button>
            <a 
              href="https://github.com/gemo42" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3 border-2 border-hack-green bg-hack-green/10 p-3 hover:bg-hack-green hover:text-black transition-all font-black text-xs uppercase"
            >
              <FiExternalLink /> Visit GitHub Profile
            </a>
          </div>
        </div>
      ),
      discord: (
        <div className="font-mono p-6 flex flex-col items-center justify-center text-center space-y-6 bg-[#2c2f33]/10">
          <div className="relative group">
            <div className="w-24 h-24 bg-[#5865F2] rounded-full flex items-center justify-center shadow-2xl shadow-[#5865F2]/40 relative z-10">
              <SiDiscord size={55} className="text-white" />
            </div>
            <div className="absolute inset-0 bg-[#5865F2] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">gemo42</h2>
            <p className="text-hack-green text-xs font-bold opacity-80 uppercase tracking-[0.2em]">User_Handle: Gemo</p>
          </div>
          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={() => copyToClipboard("Gemo")}
              className="flex items-center justify-center gap-3 border-2 border-[#5865F2] bg-[#5865F2]/10 p-3 hover:bg-[#5865F2] hover:text-white transition-all font-black text-xs uppercase"
            >
              <FiCopy /> Copy Username
            </button>
            <a 
              href="https://discord.com/users/284312737482539008" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3 border-2 border-white/20 bg-white/5 p-3 hover:bg-white hover:text-black transition-all font-black text-xs uppercase"
            >
              <FiUserPlus /> Open Discord Profile
            </a>
          </div>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">ID: 284312737482539008</p>
        </div>
      ),
      contact: (
        <div className="font-mono uppercase font-black text-hack-green p-4 pb-24 md:pb-4">
          <p className="mb-4 text-hack-light lowercase opacity-50 tracking-tighter font-bold"> initiating handshake protocol...</p>
          <div className="space-y-4 text-white">
              <div onClick={() => copyToClipboard("richard.hernandez42q@gmail.com")} className="flex items-center justify-between border-2 border-hack-green p-3 hover:bg-hack-green hover:text-black transition-all group cursor-pointer shadow-lg bg-black/40 font-black">
                  <div className="flex items-center gap-4">
                      <FiMail className="text-xl" />
                      <span className="text-xs md:text-sm lowercase font-black">richard.hernandez42q@gmail.com</span>
                  </div>
                  <FiCopy className="opacity-0 group-hover:opacity-100" />
              </div>
              <a href="https://www.linkedin.com/in/richard-francisco-hernández-bastias/" target="_blank" rel="noreferrer" className="flex items-center gap-4 border-2 border-hack-green p-3 hover:bg-hack-green hover:text-black transition-all group cursor-pointer bg-black/40">
                  <FiLinkedin className="text-xl" />
                  <span className="text-xs md:text-sm uppercase tracking-tighter">LINKEDIN.COM/IN/RICHARD</span>
              </a>
              <div onClick={() => openWindow('github')} className="flex items-center justify-between border-2 border-hack-green p-3 hover:bg-hack-green hover:text-black transition-all group cursor-pointer bg-black/40 font-black">
                  <div className="flex items-center gap-4">
                      <FiGithub className="text-xl" />
                      <span className="text-xs md:text-sm lowercase">github.com/gemo42</span>
                  </div>
                  <FiExternalLink className="opacity-0 group-hover:opacity-100" />
              </div>
          </div>
        </div>
      ),
      settings: (
        <div className="space-y-6 uppercase font-mono font-black p-4 pb-24 md:pb-4">
            <div>
                <h3 className="text-hack-green border-b-2 border-hack-green mb-4 pb-1 flex items-center gap-2 uppercase tracking-widest text-lg font-black"><FiMonitor /> THEME_SELECT</h3>
                <div className="grid grid-cols-2 gap-3">
                    <ThemeBtn name="HACKER" color="bg-[#0f0]" active={currentTheme === 'hacker'} onClick={() => changeTheme('hacker')} />
                    <ThemeBtn name="VAPORWAVE" color="bg-[#ff71ce]" active={currentTheme === 'vaporwave'} onClick={() => changeTheme('vaporwave')} />
                    <ThemeBtn name="RETRO" color="bg-[#ffb000]" active={currentTheme === 'retro'} onClick={() => changeTheme('retro')} />
                    <ThemeBtn name="ICE" color="bg-[#00ffff]" active={currentTheme === 'ice'} onClick={() => changeTheme('ice')} />
                </div>
            </div>
            <div>
                <h3 className="text-hack-green border-b-2 border-hack-green mb-4 pb-1 flex items-center gap-2 uppercase tracking-widest text-lg font-black"><FiMusic /> AUDIO_CONTROLS</h3>
                <Tunes volume={volume} setVolume={setVolume} isPlaying={isPlaying} togglePlay={togglePlay} />
            </div>
        </div>
      ),
      resume: (
        <div className="font-mono text-sm h-full flex flex-col bg-hack-darker/95 text-hack-green shadow-2xl overflow-hidden uppercase font-black">
          <div className="p-6 border-b-2 border-hack-green bg-hack-green/5 flex justify-between shrink-0">
            <div>
              <h1 className="text-3xl font-black neon-glow uppercase tracking-tighter">Richard Hernández B.</h1>
              <p className="text-hack-light font-black mt-1 tracking-widest font-mono">Ingeniero Informático // Analista de Datos</p>
            </div>
            <div className="text-[10px] text-right opacity-70 border-l border-hack-green/30 pl-4 hidden md:block font-black tracking-widest uppercase">
              <p>ID_SECURE: VERIFIED</p>
              <p>LOC: SANTIAGO, CL</p>
              <p>STATUS: ONLINE</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar pb-24 md:pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 font-black">
              <div className="space-y-6 font-mono">
                <h2 className="text-lg tracking-[0.2em] bg-hack-green/10 px-2 w-fit border-l-4 border-hack-green uppercase font-black">Work_History</h2>
                <div className="border-l border-hack-green/30 pl-4 space-y-6 font-black">
                  <div>
                    <p className="text-white text-xs underline font-black uppercase">Plásticos Benítez</p>
                    <p className="text-[10px] text-hack-light mb-2 italic tracking-tighter font-black font-mono">Administrativo | 2024 - 2025</p>
                    <ul className="text-[11px] text-white/70 space-y-1 lowercase tracking-tight">
                      <li>• análisis de datos de producción para decisiones operativas.</li>
                      <li>• gestión de bases de datos de proveedores y producción.</li>
                      <li>• elaboración de informes de rendimiento y actividad.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white text-xs underline font-black uppercase">Integramédica</p>
                    <p className="text-[10px] text-hack-light mb-2 italic tracking-tighter font-black font-mono">Call Center | 2021</p>
                    <ul className="text-[11px] text-white/70 space-y-1 lowercase tracking-tight">
                      <li>• informes detallados de volumen de llamadas y citas.</li>
                      <li>• análisis de tendencias de demanda para turnos.</li>
                      <li>• manejo y precisión en base de datos de pacientes.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-6 font-mono">
                <h2 className="text-lg tracking-[0.2em] bg-hack-green/10 px-2 w-fit border-l-4 border-hack-green uppercase font-black">Technical_Skills</h2>
                <div className="space-y-4 bg-hack-green/5 p-4 border border-hack-green/20">
                  <p className="text-[10px] text-hack-light font-bold mb-2 tracking-widest uppercase font-black">// Data_Analysis_Module</p>
                  <SkillBar name="SQL / DATABASE_DESIGN" level={90} />
                  <SkillBar name="PYTHON_ANALYSIS" level={85} />
                  <SkillBar name="POWER_BI / DASHBOARDS" level={88} />
                  <SkillBar name="EXCEL_ADVANCED" level={95} />
                  <p className="text-[10px] text-hack-light font-bold mt-4 mb-2 tracking-widest uppercase font-black">// Software_Engineering_Module</p>
                  <SkillBar name="C# / .NET_CORE" level={80} />
                  <SkillBar name="VUE.JS_FRONTEND" level={75} />
                  <SkillBar name="HTML5 / CSS3" level={90} />
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-6 border-t border-hack-green/30 font-black">
              <h2 className="text-base font-bold tracking-widest bg-hack-green/10 px-2 w-fit border-l-4 border-hack-green uppercase font-black">Additional_Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-black">
                <div className="border border-hack-green/30 bg-hack-green/5 p-3 font-black">
                  <h3 className="text-[11px] font-bold text-hack-light mb-2 flex items-center gap-2 uppercase tracking-widest font-black">
                    <span className="w-1.5 h-1.5 bg-hack-green animate-pulse font-black"></span> // Languages_Module
                  </h3>
                  <div className="space-y-2 text-white text-xs uppercase font-bold font-black">
                    <div className="flex justify-between items-center border-b border-hack-green/10 pb-1 font-black">
                      <span>ESPAÑOL</span><span className="text-[9px] bg-hack-green text-black px-2 font-bold font-black">NATIVO</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-hack-green/10 pb-1 font-black">
                      <span>INGLÉS</span><span className="text-[9px] border border-hack-green px-2 font-black font-black">INTERMEDIO</span>
                    </div>
                  </div>
                </div>
                <div className="border border-hack-green/30 bg-hack-green/5 p-3 font-bold uppercase font-black tracking-widest font-black">
                  <h3 className="text-[11px] font-bold text-hack-light mb-2 flex items-center gap-2 uppercase tracking-widest font-black">
                    <span className="w-1.5 h-1.5 bg-hack-green animate-pulse font-black"></span> // Soft_Capabilities
                  </h3>
                  <div className="flex flex-wrap gap-2 font-black">
                    {['AUTODIDACTA', 'PENSAMIENTO CRÍTICO', 'TRABAJO EN EQUIPO', 'ADAPTABILIDAD'].map((skill) => (
                      <span key={skill} className="px-2 py-1 border border-hack-green/40 text-[10px] text-white hover:bg-hack-green hover:text-black transition-all cursor-default uppercase font-mono font-black">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  };

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem('hasBooted', 'true');
    setTimeout(() => addToast('SYSTEM ONLINE. WELCOME RICHARD.', 'success'), 500);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono">
        <audio ref={audioRef} src={audioSrc} loop />
        <Toast notifications={toasts} removeNotification={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
        
        {!isBooting && (
          <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
            <MatrixRain theme={currentTheme} />
          </div>
        )}
        
        <div className="crt-overlay pointer-events-none fixed inset-0 z-[99999]"></div>
        
        {isBooting ? (
          <BootSequence onComplete={handleBootComplete} />
        ) : (
          <div className="relative z-10 w-full h-full">
            <SystemStats />
            <MusicWidget volume={volume} setVolume={setVolume} isPlaying={isPlaying} togglePlay={togglePlay} />
            <Taskbar openWindow={openWindow} />

            <div className="absolute top-16 left-4 md:top-20 md:left-6 flex flex-col md:gap-8 z-10 select-none pb-20 font-black">
                {/* En móvil usamos Grid, en Desktop Flex */}
                <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-8">
                    <DesktopIcon icon={<FiFolder className="text-3xl md:text-4xl" />} label="PROJECTS" onClick={() => openWindow('projects')} onHover={playHover} />
                    <DesktopIcon icon={<FiTerminal className="text-3xl md:text-4xl" />} label="WHOAMI" onClick={() => openWindow('about')} onHover={playHover} />
                    <DesktopIcon icon={<FiCpu className="text-3xl md:text-4xl" />} label="SKILLS" onClick={() => openWindow('skills')} onHover={playHover} />
                    <DesktopIcon icon={<FiMail className="text-3xl md:text-4xl" />} label="CONTACT" onClick={() => openWindow('contact')} onHover={playHover} />
                </div>
            </div>

            <div className="absolute top-20 right-6 md:right-10 flex flex-col gap-8 z-10 select-none font-black">
                <DesktopIcon icon={<FiFileText className="text-2xl md:text-4xl" />} label="CV_RICHARD.PDF" onClick={() => openWindow('resume')} onHover={playHover} />
            </div>

            <div className="relative w-full h-full pointer-events-none pb-16">
                <div className="pointer-events-auto w-full h-full relative">
                    {Object.keys(windowsState).map(id => (
                        <OSWindow
                            key={id} id={id} title={id.toUpperCase()}
                            isOpen={windowsState[id].isOpen} zIndex={windowsState[id].z}
                            initialPosition={windowsState[id].pos}
                            onClose={() => closeWindow(id)} onFocus={focusWindow}
                            width={id === 'discord' || id === 'github' ? 'md:w-[350px]' : (id === 'resume' ? 'md:w-[850px]' : (id === 'terminal' ? 'md:w-[700px]' : 'md:w-[500px]'))}
                            height={id === 'discord' || id === 'github' ? 'h-auto' : (id === 'resume' ? 'h-[80vh]' : (id === 'terminal' ? 'h-[500px]' : 'h-auto'))}
                        >
                            {dynamicContent[id]}
                        </OSWindow>
                    ))}
                </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;