import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChemistryMole from './pages/NaturalSciences/ChemistryMole';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/science/chemistry-mole" element={<ChemistryMole />} />
    </Routes>
  );
}

export default App;