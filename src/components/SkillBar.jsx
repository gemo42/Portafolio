import { motion } from 'framer-motion';

const SkillBar = ({ name, level }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-bold text-hack-green uppercase">{name}</span>
        <span className="text-xs font-bold text-hack-green">{level}%</span>
      </div>
      <div className="w-full bg-hack-darker border border-hack-green/30 h-2 rounded-sm overflow-hidden">
        <div 
          className="bg-hack-green h-full shadow-[0_0_10px_#0f0] transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;