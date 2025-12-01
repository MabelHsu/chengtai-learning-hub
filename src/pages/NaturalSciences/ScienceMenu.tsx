import { useNavigate } from 'react-router-dom';
import { Home, FlaskConical, Zap, ArrowRight } from 'lucide-react';

const scienceTopics = [
  {
    id: 'chem-mole',
    title: '化學：計量與莫耳數',
    desc: '學習化學反應式的係數平衡、莫耳數換算以及質量計算。',
    icon: <FlaskConical size={40} className="text-blue-600" />,
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    link: '/science/chemistry-mole'
  },
  {
    id: 'phys-acc',
    title: '物理：等加速運動',
    desc: '透過互動模擬實驗室，理解加速度、速度與位移的關係。',
    icon: <Zap size={40} className="text-amber-600" />,
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    link: '/science/acceleration'
  }
];

export default function ScienceMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="bg-emerald-700 hover:bg-emerald-500 p-2 rounded-full transition-colors"
            title="回首頁"
          >
            <Home size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">自然科學教室</h1>
            <p className="text-emerald-100 text-sm">選擇你想探索的主題</p>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scienceTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => navigate(topic.link)}
              className={`text-left p-6 rounded-xl border-2 transition-all transform hover:-translate-y-1 hover:shadow-xl ${topic.color} group h-full flex flex-col`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  {topic.icon}
                </div>
                <ArrowRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">{topic.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                {topic.desc}
              </p>
              
              <div className="mt-4 pt-4 border-t border-black/5 w-full">
                <span className="text-sm font-bold text-gray-500 group-hover:text-gray-800 transition-colors">
                  進入課程 →
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}