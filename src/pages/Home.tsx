import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, Globe, Book, FlaskConical, LayoutGrid, ArrowRight } from 'lucide-react';

const subjects = [
  {
    id: 'portuguese',
    title: '葡文 (Portuguese)',
    icon: <Languages size={32} className="text-pink-600" />,
    color: 'bg-pink-50 border-pink-200 hover:border-pink-400',
    link: '#' // 暫時沒有連結
  },
  {
    id: 'english',
    title: '英文 (English)',
    icon: <Globe size={32} className="text-indigo-600" />,
    color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
    link: '#'
  },
  {
    id: 'humanities',
    title: '人文科學 (Humanities)',
    icon: <Book size={32} className="text-amber-600" />,
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    link: '#'
  },
  {
    id: 'science',
    title: '自然科學 (Natural Sciences)',
    icon: <FlaskConical size={32} className="text-emerald-600" />,
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
    description: '包含：化學計量、物理加速度...',
    link: '/science/chemistry-mole' // 這裡連到我們做好的化學
  },
  {
    id: 'others',
    title: '其他 (Others)',
    icon: <LayoutGrid size={32} className="text-slate-600" />,
    color: 'bg-slate-50 border-slate-200 hover:border-slate-400',
    link: '#'
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12 px-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">屁蛋的學習中心</h1>
          <p className="text-blue-100 text-lg">Tai Learning Hub</p>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-4xl mx-auto p-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => sub.link !== '#' && navigate(sub.link)}
              className={`text-left p-6 rounded-xl border-2 transition-all transform hover:-translate-y-1 hover:shadow-lg ${sub.color} group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  {sub.icon}
                </div>
                {sub.link !== '#' && (
                  <ArrowRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{sub.title}</h2>
              {sub.description && (
                <p className="text-sm text-gray-600">{sub.description}</p>
              )}
              {sub.link === '#' && (
                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded">建置中...</span>
              )}
            </button>
          ))}
        </div>
      </main>

      <footer className="text-center text-gray-400 text-xs py-8">
        © 2025 Learning Hub | Designed for comprehensive learning
      </footer>
    </div>
  );
}