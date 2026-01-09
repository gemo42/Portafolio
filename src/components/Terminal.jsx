import { useState, useRef, useEffect } from 'react';
import { FiArrowUp, FiArrowDown, FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi';

const GRID_SIZE = 20; 
const SPEED = 200; 

const Terminal = () => {
  const [mode, setMode] = useState('shell'); 
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'RICHARD_OS [Version 1.0.0]' },
    { type: 'output', content: '(c) 2026 Richard Corp. All rights reserved.' },
    { type: 'info', content: "Escribe 'help' para ver comandos. TIP: Prueba 'snake'" }
  ]);

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]); 
  const [food, setFood] = useState({ x: 15, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: -1 }); 
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const gameLoopRef = useRef(null);
  const canTurn = useRef(true); 

  const commands = {
    help: "COMANDOS: about, skills, projects, contact, clear, snake",
    about: "Ingeniero de Software. Fullstack Developer.",
    skills: "React, Node, SQL, Architecture.",
    projects: "Revisa la carpeta PROJECTS_DIR en el escritorio.",
    contact: "richard@dev.com",
    snake: "GAME_INIT", 
    clear: "CLEAR_ACTION"
  };

  const handleShellKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let newHistory = [...history, { type: 'command', content: input }];

      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } 
      
      if (cmd === 'snake') {
        newHistory.push({ type: 'success', content: 'INITIALIZING GAME ENGINE...' });
        setHistory(newHistory);
        setInput('');
        setTimeout(() => startGame(), 1000); 
        return;
      }

      if (commands[cmd]) {
        newHistory.push({ type: 'output', content: commands[cmd] });
      } else if (cmd !== '') {
        newHistory.push({ type: 'error', content: `Command '${cmd}' not found.` });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  const startGame = () => {
    setMode('game');
    setSnake([{ x: 10, y: 10 }]);
    setScore(0);
    setDirection({ x: 0, y: -1 });
    setGameOver(false);
    setFood(generateFood());
    canTurn.current = true; 
  };

  const stopGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    setMode('shell');
    setHistory(prev => [...prev, 
      { type: 'error', content: 'GAME OVER' },
      { type: 'success', content: `FINAL SCORE: ${score}` }
    ]);
  };

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  };

  const handleMove = (newDir) => {
    if (!canTurn.current) return;
    let moved = false;

    if (newDir === 'UP' && direction.y === 0) {
       setDirection({ x: 0, y: -1 }); moved = true;
    } else if (newDir === 'DOWN' && direction.y === 0) {
       setDirection({ x: 0, y: 1 }); moved = true;
    } else if (newDir === 'LEFT' && direction.x === 0) {
       setDirection({ x: -1, y: 0 }); moved = true;
    } else if (newDir === 'RIGHT' && direction.x === 0) {
       setDirection({ x: 1, y: 0 }); moved = true;
    }

    if (moved) canTurn.current = false;
  };

  useEffect(() => {
    const handleGameKeys = (e) => {
      if (mode !== 'game') return;
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
      }
      
      if (e.key === 'Escape') stopGame();
      if (e.key === 'ArrowUp') handleMove('UP');
      if (e.key === 'ArrowDown') handleMove('DOWN');
      if (e.key === 'ArrowLeft') handleMove('LEFT');
      if (e.key === 'ArrowRight') handleMove('RIGHT');
    };

    window.addEventListener('keydown', handleGameKeys);
    return () => window.removeEventListener('keydown', handleGameKeys);
  }, [mode, direction]);

  // Game Loop
  useEffect(() => {
    if (mode !== 'game' || gameOver) return;

    gameLoopRef.current = setInterval(() => {
      canTurn.current = true;
      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop(); 
        }

        return newSnake;
      });
    }, SPEED); 

    return () => clearInterval(gameLoopRef.current);
  }, [mode, direction, food, gameOver]);

  useEffect(() => {
    if (gameOver) {
      setTimeout(stopGame, 1500); 
    }
  }, [gameOver]);

  useEffect(() => {
    if (mode === 'shell') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, mode]);

  return (
    <div className="h-full flex flex-col font-mono text-sm p-4 bg-black/80 text-hack-green relative overflow-hidden" onClick={() => mode === 'shell' && inputRef.current?.focus()}>
      
      {mode === 'shell' && (
        <>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
            {history.map((line, i) => (
              <div key={i} className={`${line.type === 'error' ? 'text-red-500' : line.type === 'success' ? 'text-yellow-400' : line.type === 'command' ? 'text-white' : 'text-hack-green'}`}>
                {line.type === 'command' && <span className="text-hack-light mr-2">C:\Admin{'>'}</span>}
                {line.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          
          <div className="flex items-center mt-2 border-t border-hack-green/30 pt-2">
            <span className="text-hack-light mr-2">C:\Admin{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleShellKeyDown}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 uppercase"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
            <span className="w-2 h-4 bg-hack-green animate-pulse ml-1"></span>
          </div>
        </>
      )}

      {mode === 'game' && (
        <div className="flex flex-col items-center justify-center h-full w-full animate-fadeIn pb-10 md:pb-0">
            <div className="mb-2 text-hack-green font-bold flex justify-between w-[90%] md:w-[300px]">
                <span>SNAKE.EXE</span>
                <span>SCORE: {score}</span>
            </div>
            <div 
                className="relative bg-hack-darker border-2 border-hack-green shadow-[0_0_20px_rgba(0,255,0,0.2)] shrink-0"
                style={{
                    width: 'min(300px, 80vw)',
                    height: 'min(300px, 80vw)',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                }}
            >
                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-red-500 font-bold text-2xl z-20 animate-pulse">
                        GAME OVER
                    </div>
                )}

                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(s => s.x === x && s.y === y);
                    const isHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;

                    return (
                        <div key={i} className="w-full h-full relative">
                            {isSnake && (
                                <div className={`absolute inset-[1px] ${isHead ? 'bg-white' : 'bg-hack-green'} rounded-sm`}></div>
                            )}
                            {isFood && (
                                <div className="absolute inset-[2px] bg-red-500 rounded-full animate-pulse"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="md:hidden grid grid-cols-3 gap-2 mt-6 w-[180px]">
                <div className="col-start-2">
                    <MobileBtn onClick={() => handleMove('UP')} icon={<FiArrowUp />} />
                </div>
                <div className="col-start-1">
                    <MobileBtn onClick={() => handleMove('LEFT')} icon={<FiArrowLeft />} />
                </div>
                <div className="col-start-2">
                    <MobileBtn onClick={() => handleMove('DOWN')} icon={<FiArrowDown />} />
                </div>
                <div className="col-start-3">
                    <MobileBtn onClick={() => handleMove('RIGHT')} icon={<FiArrowRight />} />
                </div>
            </div>
            <button 
                onClick={stopGame}
                className="md:hidden mt-4 border border-red-500 text-red-500 px-4 py-1 rounded text-xs hover:bg-red-500 hover:text-white transition-colors"
            >
                EXIT GAME
            </button>

            <p className="hidden md:block mt-4 text-xs text-hack-light">USE ARROW KEYS TO MOVE // ESC TO EXIT</p>
        </div>
      )}
    </div>
  );
};

const MobileBtn = ({ onClick, icon }) => (
    <button 
        className="w-12 h-12 flex items-center justify-center border border-hack-green bg-hack-darker text-hack-green rounded active:bg-hack-green active:text-black transition-colors"
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onTouchStart={(e) => { e.stopPropagation(); onClick(); }}
    >
        {icon}
    </button>
);

export default Terminal;