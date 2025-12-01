import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, Calculator, BookOpen, Flag, Info, Home, Cloud } from 'lucide-react';

const PhysicsLab = () => {
  const [activeTab, setActiveTab] = useState('theory');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* 回首頁按鈕 */}
            <button 
              onClick={() => navigate('/')} 
              className="bg-indigo-700 hover:bg-indigo-500 p-2 rounded-full transition-colors"
              title="回首頁"
            >
              <Home size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-full text-indigo-600 hidden sm:block">
                <Calculator size={20} />
              </div>
              <h1 className="text-lg md:text-2xl font-bold">物理：等加速運動實驗室</h1>
            </div>
          </div>
          <nav className="flex space-x-1 md:space-x-2">
            <NavButton id="theory" label="公式原理" icon={<BookOpen size={18} />} active={activeTab} set={setActiveTab} />
            <NavButton id="sim" label="互動模擬" icon={<Play size={18} />} active={activeTab} set={setActiveTab} />
            <NavButton id="quiz" label="實戰題庫" icon={<Flag size={18} />} active={activeTab} set={setActiveTab} />
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 pb-20">
        {activeTab === 'theory' && <TheorySection />}
        {activeTab === 'sim' && <SimulationSection />}
        {activeTab === 'quiz' && <QuizSection />}
      </main>
    </div>
  );
};

const NavButton = ({ id, label, icon, active, set }: any) => (
  <button
    onClick={() => set(id)}
    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
      active === id ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-700'
    }`}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </button>
);

// --- Helper for Math Formatting ---
const M = ({ children, sub, sup }: any) => (
  <span className="font-serif italic">
    {children}
    {sub && <sub className="not-italic text-[0.7em] ml-[1px]">{sub}</sub>}
    {sup && <sup className="not-italic text-[0.7em] ml-[1px]">{sup}</sup>}
  </span>
);

const TextMath = ({ text }: any) => {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(\$[^\$]+\$)/g);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const content = part.slice(1, -1);
          if (content.includes('_') || content.includes('^') || content.length === 1 || content.match(/^[a-zA-Z]+$/)) {
             return (
               <span key={index} className="mx-1 text-indigo-700 font-medium">
                  {content.replace(/([a-zA-Z])_(\d+|[a-z])/g, (m, v, s) => `<M>${v}<sub>${s}</sub></M>`)
                          .replace(/([a-zA-Z])\^(\d+)/g, (m, v, s) => `<M>${v}<sup>${s}</sup></M>`)
                          .split(/<M>(.*?)<\/M>/g).map((seg, i) => {
                             if (seg.includes('<sub>')) {
                               const [_, v, s] = seg.match(/(.*?)<sub>(.*?)<\/sub>/) || [];
                               return <M key={i} sub={s}>{v}</M>;
                             }
                             if (seg.includes('<sup>')) {
                               const [_, v, s] = seg.match(/(.*?)<sup>(.*?)<\/sup>/) || [];
                               return <M key={i} sup={s}>{v}</M>;
                             }
                             if (seg.match(/^[\d\.\+\-\=]+$/)) return <span key={i} className="font-sans mx-1">{seg}</span>;
                             if (seg.match(/^[a-zA-Z]$/)) return <M key={i}>{seg}</M>;
                             if (seg.includes('\\Delta')) return <span key={i} className="font-serif">Δ</span>;
                             return <span key={i}>{seg}</span>;
                          })}
               </span>
             );
          }
          return <span key={index} className="font-mono bg-indigo-50 px-1 rounded">{content}</span>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

// --- Visual Components for Formulas ---

const VisAcc = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full text-slate-600">
    <line x1="20" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow)" />
    <line x1="20" y1="90" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
    <text x="10" y="20" fontSize="10">v</text>
    <text x="180" y="98" fontSize="10">t</text>
    <circle cx="20" cy="70" r="3" fill="#6366f1" />
    <circle cx="120" cy="30" r="3" fill="#6366f1" />
    <line x1="20" y1="70" x2="120" y2="30" stroke="#6366f1" strokeWidth="2" />
    <line x1="130" y1="70" x2="130" y2="30" stroke="#f59e0b" strokeWidth="1.5" />
    <line x1="128" y1="70" x2="132" y2="70" stroke="#f59e0b" strokeWidth="1.5" />
    <line x1="128" y1="30" x2="132" y2="30" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="135" y="55" fontSize="10" fill="#d97706">Δv (速度變化)</text>
    <text x="135" y="65" fontSize="8" fill="#d97706">= v - v₀</text>
    <line x1="20" y1="95" x2="120" y2="95" stroke="#64748b" strokeWidth="1.5" />
    <text x="65" y="105" fontSize="10" textAnchor="middle" fill="#64748b">t (時間)</text>
    <text x="5" y="73" fontSize="10" textAnchor="end">v₀</text>
    <text x="5" y="33" fontSize="10" textAnchor="end">v</text>
  </svg>
);

const VisVel = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full">
    <rect x="50" y="50" width="40" height="40" fill="#a5b4fc" stroke="#6366f1" />
    <text x="95" y="75" fontSize="12" fill="#4f46e5">v₀ (原本)</text>
    <path d="M45 50 L45 90" stroke="#6366f1" strokeWidth="1" />
    <text x="40" y="75" fontSize="12" textAnchor="end" fill="#4f46e5">v₀</text>
    <rect x="50" y="10" width="40" height="40" fill="#fcd34d" stroke="#f59e0b" />
    <text x="95" y="35" fontSize="12" fill="#b45309">at (增加)</text>
    <path d="M45 10 L45 50" stroke="#f59e0b" strokeWidth="1" />
    <text x="40" y="35" fontSize="12" textAnchor="end" fill="#b45309">at</text>
    <path d="M140 10 L145 10 L145 90 L140 90" fill="none" stroke="#334155" />
    <text x="150" y="55" fontSize="14" fontWeight="bold" fill="#334155">v (後來)</text>
  </svg>
);

const VisDisp = () => (
  <svg viewBox="0 0 200 110" className="w-full h-full">
    <line x1="20" y1="100" x2="190" y2="100" stroke="#94a3b8" strokeWidth="1" />
    <line x1="20" y1="100" x2="20" y2="5" stroke="#94a3b8" strokeWidth="1" />
    <rect x="20" y="60" width="100" height="40" fill="#e0e7ff" opacity="0.8" />
    <text x="70" y="85" fontSize="10" textAnchor="middle" fill="#4338ca">v₀t</text>
    <path d="M20 60 L120 60 L120 20 Z" fill="#fef3c7" opacity="0.8" />
    <text x="90" y="55" fontSize="10" textAnchor="middle" fill="#b45309">½ at²</text>
    <line x1="20" y1="60" x2="120" y2="20" stroke="#6366f1" strokeWidth="2" />
    <line x1="120" y1="100" x2="120" y2="20" stroke="#94a3b8" strokeDasharray="4" />
    <text x="15" y="65" fontSize="10" textAnchor="end">v₀</text>
    <text x="15" y="25" fontSize="10" textAnchor="end">v</text>
    <text x="70" y="108" fontSize="10" textAnchor="middle">t</text>
    <text x="130" y="70" fontSize="10" fill="#334155" fontWeight="bold">總面積 = 位移 Δs</text>
  </svg>
);

const VisNoTime = () => (
  <svg viewBox="0 0 200 80" className="w-full h-full">
    <line x1="10" y1="60" x2="190" y2="60" stroke="#94a3b8" strokeWidth="2" />
    <circle cx="30" cy="55" r="5" fill="#a5b4fc" />
    <rect x="20" y="45" width="20" height="10" fill="#6366f1" rx="2" />
    <line x1="30" y1="45" x2="50" y2="45" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow)" />
    <text x="30" y="35" fontSize="10" textAnchor="middle" fill="#4338ca">v₀</text>
    <circle cx="150" cy="55" r="5" fill="#fcd34d" />
    <rect x="140" y="45" width="20" height="10" fill="#f59e0b" rx="2" />
    <line x1="150" y1="45" x2="185" y2="45" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
    <text x="150" y="35" fontSize="10" textAnchor="middle" fill="#b45309">v (更快)</text>
    <line x1="30" y1="70" x2="150" y2="70" stroke="#334155" strokeWidth="1" />
    <line x1="30" y1="68" x2="30" y2="72" stroke="#334155" strokeWidth="1" />
    <line x1="150" y1="68" x2="150" y2="72" stroke="#334155" strokeWidth="1" />
    <text x="90" y="78" fontSize="10" textAnchor="middle" fontWeight="bold">Δs</text>
    <text x="90" y="20" fontSize="10" textAnchor="middle" fill="#dc2626">加速度 a</text>
    <line x1="70" y1="25" x2="110" y2="25" stroke="#dc2626" strokeWidth="1" markerEnd="url(#arrow-red)" />
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
      </marker>
      <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
      </marker>
    </defs>
  </svg>
);


// --- 1. Theory Section ---
const TheorySection = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">什麼是「等加速運動」？</h2>
      <p className="mb-4 text-slate-600 leading-relaxed text-lg">
        想像你踩著油門不放，車子的速度會<strong>越來越快</strong>。如果速度增加的節奏是固定的（例如每秒都增加 2 m/s），這就是等加速運動。
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
      <FormulaCard 
        title="0. 加速度的定義" 
        formula={<><M>a</M> = <div className="inline-flex flex-col items-center align-middle mx-2 border-b border-black"><span className="border-b border-slate-400 w-full mb-1 text-center pb-1"><M>v</M> - <M sub="0">v</M></span><span><M>t</M></span></div></>}
        desc="加速度 = 速度的變化量 ÷ 花費的時間。"
        explanation="平均每一秒鐘，速度改變了多少？"
        visual={<VisAcc />}
        vars={[
          <span key="1"><M>a</M> : 加速度 (acceleration)</span>,
          <span key="2"><M>v</M> - <M sub="0">v</M> : 速度變了多少</span>,
          <span key="3"><M>t</M> : 經過的時間</span>
        ]}
      />

      <FormulaCard 
        title="1. 預測未來的速度" 
        formula={<><M>v</M> = <M sub="0">v</M> + <M>a</M><M>t</M></>}
        desc="想知道幾秒後，車速會變多快？"
        explanation="現在的速度 = 原本的速度 + (加速度 × 時間)。就像存錢：原本的錢 + (每天存的錢 × 天數)。"
        visual={<VisVel />}
        vars={[
          <span key="1"><M>v</M> : 後來的速度 (末速)</span>,
          <span key="2"><M sub="0">v</M> : 一開始的速度 (初速)</span>,
          <span key="3"><M>a</M><M>t</M> : 這段時間增加的速度</span>
        ]}
      />

      <FormulaCard 
        title="2. 計算跑了多遠" 
        formula={<>Δ<M>s</M> = <M sub="0">v</M><M>t</M> + <span className="mx-1">½</span><M>a</M><M sup="2">t</M></>}
        desc="想知道這段時間內，車子總共前進了幾公尺？"
        explanation="距離由兩部分組成。「原本速度跑的距離」加上「因為加速而多跑的距離」。即 V-t 圖下的總面積。"
        visual={<VisDisp />}
        vars={[
          <span key="1">Δ<M>s</M> : 位移 (移動距離)</span>,
          <span key="2"><M sub="0">v</M><M>t</M> : 假如不加速會跑的距離</span>,
          <span key="3">½<M>a</M><M sup="2">t</M> : 加速帶來的額外距離</span>
        ]}
      />

      <FormulaCard 
        title="3. 沒有「時間」怎麼辦？" 
        formula={<><M sup="2">v</M> = <M sub="0" sup="2">v</M> + 2<M>a</M>Δ<M>s</M></>}
        desc="當題目沒有給你時間 (t)，又想算速度或距離時。"
        explanation="這是把第1式和第2式合併，消去時間 t 得到的公式。專門用來對付沒給時間的題目。"
        visual={<VisNoTime />}
        vars={[
          <span key="1"><M>v</M> : 末速度</span>,
          <span key="2"><M sub="0">v</M> : 初速度</span>,
          <span key="3">Δ<M>s</M> : 位移</span>
        ]}
      />
    </div>
    
    <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
      <h3 className="font-bold text-amber-800 mb-2 text-lg">💡 解題關鍵字翻譯</h3>
      <ul className="list-disc list-inside space-y-2 text-amber-900">
        <li><strong>「靜止出發」：</strong> 就是初速度 <M sub="0">v</M> = 0。</li>
        <li><strong>「煞車」或「減速」：</strong> 加速度 <M>a</M> 要代負號 (例如 -2)。</li>
        <li><strong>「停下來」：</strong> 就是末速度 <M>v</M> = 0。</li>
      </ul>
    </div>
  </div>
);

const FormulaCard = ({ title, formula, desc, explanation, visual, vars }: any) => (
  <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-slate-100">
    <div className="mb-4">
        <h3 className="font-bold text-lg text-indigo-800 mb-1">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
    </div>
    <div className="bg-indigo-50/50 py-6 px-4 rounded-lg text-center text-2xl text-indigo-700 mb-4 font-medium min-h-[5rem] flex items-center justify-center">
       {formula}
    </div>
    <div className="mb-4 bg-yellow-50 p-3 rounded text-sm text-yellow-800 border-l-4 border-yellow-300">
        <div className="mb-2 leading-relaxed">{explanation}</div>
        {visual && (
          <div className="mt-3 bg-white p-3 rounded border border-yellow-200 shadow-sm">
             <div className="text-xs text-slate-400 mb-2 flex items-center gap-1"><Info size={12}/> 觀念圖解</div>
             <div className="w-full h-32 flex justify-center">
               {visual}
             </div>
          </div>
        )}
    </div>
    <div className="space-y-1 mt-auto bg-slate-50 p-3 rounded border border-slate-100">
      {vars.map((v: any, i: number) => (
        <div key={i} className="text-sm text-slate-500">{v}</div>
      ))}
    </div>
  </div>
);

// --- 2. Simulation Section ---
const SimulationSection = () => {
  const [v0, setV0] = useState(0); 
  const [a, setA] = useState(2); 
  const [t, setT] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const currentPos = (v0 * t) + (0.5 * a * t * t);
  const currentVel = v0 + (a * t);

  const trackRange = 100;
  
  const viewPos = Math.min(Math.max(currentPos, -110), 110);
  const carPositionPercent = 50 + (viewPos * 0.5);
  
  const speed = Math.abs(currentVel);
  const isMoving = speed > 0.1;
  const wheelDuration = isMoving ? Math.max(0.1, 2 / speed) : 0;
  
  const wheelAnimationName = currentVel >= 0 ? 'spin-cw' : 'spin-ccw';

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spin-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    `;
    document.head.appendChild(styleSheet);
    return () => { document.head.removeChild(styleSheet); }
  }, []);

  const animate = (timestamp: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = (timestamp - previousTimeRef.current) / 1000;
      
      setT(prevT => {
        const nextT = prevT + deltaTime;
        const nextPos = (v0 * nextT) + (0.5 * a * nextT * nextT);
        
        if (Math.abs(nextPos) > trackRange + 5) {
           setIsRunning(false);
           return prevT; 
        }
        return nextT;
      });
    }
    previousTimeRef.current = timestamp;
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = undefined;
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setT(0);
    previousTimeRef.current = undefined;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
      {/* Controls */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-lg text-slate-700">參數設定</h3>
             <button onClick={handleReset} className="text-slate-400 hover:text-indigo-600 transition-colors" title="重置">
                <RotateCcw size={18}/>
             </button>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                <span>初速度 <M sub="0">v</M> (一開始的速度)</span>
                <span className="text-indigo-600 font-bold font-mono text-lg">{v0} <span className="text-xs">m/s</span></span>
              </label>
              <input 
                type="range" min="-30" max="30" step="1"
                value={v0} onChange={(e) => { setV0(Number(e.target.value)); handleReset(); }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
                <span>倒車 (-30)</span>
                <span>0</span>
                <span>前進 (+30)</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                <span>加速度 <M>a</M> (油門/煞車)</span>
                <span className="text-indigo-600 font-bold font-mono text-lg">{a} <span className="text-xs">m/s²</span></span>
              </label>
              <input 
                type="range" min="-10" max="10" step="0.5"
                value={a} onChange={(e) => { setA(Number(e.target.value)); handleReset(); }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
                <span>減速/向左加速</span>
                <span>0</span>
                <span>加速/向右加速</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`w-full mt-6 flex items-center justify-center space-x-2 py-4 rounded-xl font-bold text-lg shadow-md transition-all transform active:scale-95 ${
              isRunning 
                ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isRunning ? <><Pause size={24}/> <span>暫停模擬</span></> : <><Play size={24}/> <span>開始模擬</span></>}
          </button>
        </div>

        {/* Dashboard */}
        <div className="bg-slate-800 text-emerald-400 p-6 rounded-xl font-mono shadow-inner border border-slate-700">
          <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-4 border-b border-slate-600 pb-2 flex items-center justify-between">
            <span>即時數據</span>
            {isRunning && <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>}
          </h3>
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-slate-500 text-xs mb-1">時間 <M>t</M></div>
              <div className="text-2xl text-white">{t.toFixed(2)} <span className="text-sm text-slate-400">s</span></div>
            </div>
            <div>
              <div className="text-slate-500 text-xs mb-1">位移 Δ<M>s</M></div>
              <div className="text-2xl text-white">{currentPos.toFixed(1)} <span className="text-sm text-slate-400">m</span></div>
            </div>
            <div className="col-span-2 bg-slate-900/50 p-3 rounded-lg border border-slate-700">
              <div className="flex justify-between items-baseline mb-2">
                <div className="text-slate-500 text-xs">瞬時速度 <M>v</M></div>
                <div className={`text-3xl font-bold ${currentVel < 0 ? 'text-red-400' : 'text-emerald-400'}`}>{currentVel.toFixed(1)} <span className="text-sm text-slate-500">m/s</span></div>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden relative">
                <div className="absolute left-1/2 w-px h-full bg-slate-400 z-10"></div> 
                <div 
                  className={`h-full transition-all duration-75 absolute top-0 ${currentVel >= 0 ? 'bg-emerald-500 left-1/2' : 'bg-red-500 right-1/2'}`}
                  style={{ 
                    width: `${Math.min(Math.abs(currentVel) * 1.5, 50)}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>-30</span>
                <span>0</span>
                <span>+30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Stage - The Road */}
      <div className="lg:col-span-2 flex flex-col h-[500px]">
        <div className="flex-1 bg-sky-200 rounded-xl shadow-lg overflow-hidden relative border-4 border-slate-300 flex flex-col justify-end">
          
          {/* Sky & Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-300 to-sky-100">
              <div className="absolute top-10 left-10 text-white opacity-80"><Cloud size={60} /></div>
              <div className="absolute top-20 right-20 text-white opacity-60"><Cloud size={40} /></div>
              <div className="absolute bottom-[30%] left-0 w-full h-12 bg-emerald-700 opacity-20" style={{borderRadius: '50% 50% 0 0', transform: 'scaleX(2)'}}></div>
          </div>

          {/* The Road Surface */}
          <div className="relative h-[35%] bg-slate-600 border-t-4 border-slate-700 w-full">
              {/* Road Markings (Distance) */}
              <div className="absolute top-0 w-full h-full">
                 {[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100].map((mark) => {
                    const leftPos = 50 + (mark * 0.5);
                    return (
                      <div key={mark} className="absolute bottom-full h-8 border-l border-slate-400 flex flex-col items-center" style={{ left: `${leftPos}%` }}>
                        <span className={`text-[10px] px-1 rounded -translate-y-full mb-1 font-mono font-bold ${mark === 0 ? 'bg-indigo-600 text-white z-10' : 'bg-slate-100 text-slate-600'}`}>
                          {mark}m
                        </span>
                      </div>
                    );
                 })}
              </div>

              {/* Center Lines */}
              <div className="absolute top-1/2 w-full border-t-2 border-dashed border-slate-400/50"></div>
              
              {/* Start Line Indicator */}
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/20 z-0"></div>

              {/* The Car Container */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 transition-transform duration-75 ease-linear will-change-transform z-20"
                style={{ 
                  left: '0%', 
                  transform: `translateX(calc(${carPositionPercent}% - 60px))`
                }}
              >
                 {/* Visual Car Component */}
                 <div className="relative w-32 h-16 group">
                    <svg viewBox="0 0 200 80" className={`w-full h-full drop-shadow-xl transform scale-110 ${currentVel < 0 ? '-scale-x-100' : ''} transition-transform duration-300`}>
                       <path d="M40 50 L55 25 L125 25 L145 50 Z" fill="#4F46E5" />
                       <rect x="20" y="50" width="160" height="30" rx="10" fill="#4338ca" />
                       <path d="M58 28 L122 28 L138 48 L44 48 Z" fill="#a5b4fc" opacity="0.8" />
                       <path d="M170 55 Q175 55 175 65 Q175 75 170 75" fill="#fcd34d" className={isMoving ? "animate-pulse" : ""} />
                       <rect x="18" y="55" width="4" height="12" fill="#ef4444" />
                    </svg>
                    
                    <div className="absolute bottom-0 left-4 w-7 h-7 bg-slate-800 rounded-full border-2 border-slate-400 flex items-center justify-center">
                       <div className="w-5 h-5 border-2 border-dashed border-slate-500 rounded-full" style={{ animation: isMoving ? `${wheelAnimationName} ${wheelDuration}s linear infinite` : 'none' }}></div>
                    </div>
                    <div className="absolute bottom-0 right-8 w-7 h-7 bg-slate-800 rounded-full border-2 border-slate-400 flex items-center justify-center">
                       <div className="w-5 h-5 border-2 border-dashed border-slate-500 rounded-full" style={{ animation: isMoving ? `${wheelAnimationName} ${wheelDuration}s linear infinite` : 'none' }}></div>
                    </div>

                    {/* Velocity Vector */}
                    {Math.abs(currentVel) > 0.5 && (
                       <div 
                         className="absolute top-[-25px] left-1/2 h-8 flex items-center transition-all origin-left z-30" 
                         style={{ 
                           width: `${Math.min(Math.abs(currentVel) * 5, 100)}px`,
                           transform: currentVel < 0 ? 'scaleX(-1) translateX(50%)' : 'translateX(-50%)'
                         }}
                       >
                           <div className={`h-2 flex-1 rounded-full ${currentVel > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                           <div className={`w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent ${currentVel > 0 ? 'border-l-emerald-500' : 'border-l-red-500'}`}></div>
                           <div 
                             className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-700 bg-white/80 px-1.5 py-0.5 rounded shadow-sm"
                             style={{ transform: currentVel < 0 ? 'scaleX(-1) translateX(-50%)' : 'translateX(-50%)' }}
                           >
                             {currentVel.toFixed(1)} m/s
                           </div>
                       </div>
                    )}
                 </div>
              </div>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm text-yellow-800 flex items-start space-x-2">
          <div className="mt-0.5">⚠️</div>
          <div>
            <strong>模擬器說明：</strong> 跑道範圍：-100m ~ +100m（原點在中央）。
            試試看設定 <strong>正的初速度</strong> 搭配 <strong>負的加速度</strong>，觀察車子減速並倒車的過程！
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Quiz Section ---
const QuizSection = () => {
  const problems = [
    {
      id: 1,
      title: "基本題：距離計算",
      question: "一輛車從靜止出發 ($v_0 = 0$)，以加速度 $a = 2.0$ 移動。請問 3.0 秒後，它移動了多少距離 ($Δs$)？",
      solution: (
        <div>
          <p>使用位移公式：$Δs = v_0t + 1/2 at^2$</p>
          <p>代入數值：</p>
          <ul className="list-disc list-inside ml-4 mt-2 mb-2 font-mono text-sm bg-slate-50 p-2 rounded text-slate-600">
            <li><M sub="0">v</M> = 0</li>
            <li><M>a</M> = 2.0</li>
            <li><M>t</M> = 3.0</li>
          </ul>
          <p>計算：<br/>$Δs = 0 \\times 3 + 0.5 \\times 2 \\times (3)^2$</p>
          <p>$Δs = 0 + 1 \\times 9 = 9$</p>
          <p className="font-bold text-indigo-600 mt-2">答案：9 公尺</p>
        </div>
      ),
      answer: 9,
      unit: "m"
    },
    {
      id: 2,
      title: "進階題：煞車問題",
      question: "車子速度 $20m/s$。看到紅燈後踩煞車。若要在前進 $25m$ 處剛好停下 (末速=0)，煞車產生的加速度應該是多少？(請填寫負值)",
      solution: (
        <div>
          <p>這題不知道時間 <M>t</M>，所以使用「無時公式」：</p>
          <p>$v^2 = v_0^2 + 2aΔs$</p>
          <ul className="list-disc list-inside ml-4 mt-2 mb-2 font-mono text-sm bg-slate-50 p-2 rounded text-slate-600">
            <li><M>v</M> = 0 (停下)</li>
            <li><M sub="0">v</M> = 20</li>
            <li>Δ<M>s</M> = 25</li>
          </ul>
          <p>$0^2 = 20^2 + 2 \\times a \\times 25$</p>
          <p>$0 = 400 + 50a$</p>
          <p>$50a = -400$</p>
          <p>$a = -8$</p>
          <p className="font-bold text-indigo-600 mt-2">答案：-8 m/s²</p>
        </div>
      ),
      answer: -8,
      unit: "m/s²"
    },
    {
      id: 3,
      title: "變化題：加速度求值",
      question: "在 4 秒內，車子的速度從 $8m/s$ 增加到 $18m/s$。請問其加速度是多少？",
      solution: (
        <div>
          <p>使用加速度定義：$a = (v - v_0) / t$</p>
          <ul className="list-disc list-inside ml-4 mt-2 mb-2 font-mono text-sm bg-slate-50 p-2 rounded text-slate-600">
            <li><M>v</M> = 18 (後來的速度)</li>
            <li><M sub="0">v</M> = 8 (原本的速度)</li>
            <li><M>t</M> = 4</li>
          </ul>
          <p>$a = (18 - 8) / 4$</p>
          <p>$a = 10 / 4$</p>
          <p>$a = 2.5$</p>
          <p className="font-bold text-indigo-600 mt-2">答案：2.5 m/s²</p>
        </div>
      ),
      answer: 2.5,
      unit: "m/s²"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg flex items-start space-x-3">
        <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 flex-shrink-0">
          <BookOpen size={20} />
        </div>
        <div>
           <p className="text-indigo-900 font-medium">練習說明</p>
           <p className="text-sm text-indigo-700">請閱讀題目後計算，並在下方欄位輸入答案。系統會自動判斷對錯。</p>
        </div>
      </div>
      
      {problems.map((p) => (
        <QuizCard key={p.id} problem={p} />
      ))}
    </div>
  );
};

const QuizCard = ({ problem }: any) => {
  const [userAns, setUserAns] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, wrong
  const [showSolution, setShowSolution] = useState(false);

  const checkAnswer = () => {
    const val = parseFloat(userAns);
    if (isNaN(val)) return;
    
    // Allow small margin of error for floating point
    if (Math.abs(val - problem.answer) < 0.1) {
      setStatus('correct');
      setShowSolution(true);
    } else {
      setStatus('wrong');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-slate-800">{problem.title}</h3>
          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">Q-{problem.id}</span>
        </div>
        
        <div className="text-slate-700 mb-6 leading-relaxed text-lg">
           <TextMath text={problem.question} />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
             <input 
              type="number" 
              placeholder="輸入答案" 
              value={userAns}
              onChange={(e) => { setUserAns(e.target.value); setStatus('idle'); }}
              className={`pl-4 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors w-40 text-lg ${
                status === 'wrong' ? 'border-red-300 bg-red-50' : 
                status === 'correct' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 focus:border-indigo-400'
              }`}
             />
             <span className="absolute right-3 top-3.5 text-slate-400 text-sm font-medium">{problem.unit}</span>
          </div>
          
          <button 
            onClick={checkAnswer}
            disabled={status === 'correct'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors shadow-sm ${
              status === 'correct' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {status === 'correct' ? '答對了！' : '檢查'}
          </button>
        </div>

        {status === 'wrong' && (
          <p className="text-red-500 text-sm mb-4 animate-shake font-bold">❌ 答案不正確，請再檢查計算過程。</p>
        )}

        <button 
          onClick={() => setShowSolution(!showSolution)}
          className="text-sm text-slate-400 hover:text-indigo-500 underline decoration-dotted mt-2"
        >
          {showSolution ? '隱藏詳細解析' : '看解題過程'}
        </button>

        {showSolution && (
          <div className="mt-4 p-5 bg-indigo-50/50 rounded-lg border border-indigo-100 text-slate-700 animate-fade-in">
            <h4 className="font-bold text-sm text-indigo-400 mb-3 uppercase tracking-wider">Solution</h4>
            <div className="space-y-2 font-light">
               <TextMath text={typeof problem.solution === 'string' ? problem.solution : null} />
               {problem.solution && typeof problem.solution !== 'string' ? problem.solution : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicsLab;