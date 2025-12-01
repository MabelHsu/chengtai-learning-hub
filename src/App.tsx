import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScienceMenu from './pages/NaturalSciences/ScienceMenu'; // 新增這行
import ChemistryMole from './pages/NaturalSciences/ChemistryMole';
import Acceleration from './pages/NaturalSciences/Acceleration';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* 自然科學的總目錄 */}
      <Route path="/science" element={<ScienceMenu />} />
      
      {/* 各別課程 */}
      <Route path="/science/chemistry-mole" element={<ChemistryMole />} />
      <Route path="/science/acceleration" element={<Acceleration />} />
    </Routes>
  );
}

export default App;